'use client'

import {useState, useEffect} from 'react'
import AutomobileCard from '@/components/AutomobileCard'
import AutomobileFilters from '@/components/AutomobileFilters'
import AutomobilePagination from '@/components/AutomobilePagination'
import styles from './automobiles.module.css'
import BASE_URL from '@/utils/baseurl'

export default function AutomobilesClient({locale, features, brands}) {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [vinCode, setVinCode] = useState('')
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [selectedBrandId, setSelectedBrandId] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [sortOrder, setSortOrder] = useState('asc')
    const [filteredCars, setFilteredCars] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0,
        from: 0,
        to: 0
    })

    const carsPerPage = 12
    // Fetch automobiles from API
    useEffect(() => {
        const fetchAutomobiles = async () => {
            try {
                setLoading(true)

                // Build query parameters
                const queryParams = new URLSearchParams()
                queryParams.append('locale', locale)

                // Add filters to query params
                if (selectedBrandId) queryParams.append('brand_id', selectedBrandId)
                if (searchTerm) queryParams.append('search', searchTerm)
                if (vinCode) queryParams.append('vin', vinCode)
                if (selectedFeatures.length > 0) queryParams.append('feature_ids', selectedFeatures.join(','))
                if (sortBy) queryParams.append('order_by', sortBy)
                if (sortOrder) queryParams.append('order_direction', sortOrder)

                // Add pagination
                queryParams.append('page', currentPage.toString())
                queryParams.append('per_page', carsPerPage.toString())

                const response = await fetch(`${BASE_URL}/automobiles?${queryParams.toString()}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()

                if (result.success && result.data) {
                    // Transform API data to match component expectations
                    const transformedCars = result.data.map(car => ({
                        id: car.id,
                        name: car.name,
                        vin: car.vin,
                        image: car.first_image?.url || car.first_image?.thumb_url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                        features: car.features?.map(f => f.name) || [],
                        featureDetails: car.features || [],
                        // Add default values for missing fields
                        brand: car.brand?.name || 'Unknown Brand',
                        brandId: car.brand?.id,
                        year: car.year || 2024,
                        price: car.price || 0,
                        description: car.description || '',
                        inStock: car.inStock !== undefined ? car.inStock : true,
                        departure_date: car.departure_date,
                        created_at: car.created_at,
                        updated_at: car.updated_at
                    }))

                    setCars(transformedCars)

                    // Set pagination info
                    if (result.pagination) {
                        setPagination(result.pagination)
                    }
                } else {
                    throw new Error('Invalid API response format')
                }
            } catch (err) {
                console.error('Error fetching automobiles:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAutomobiles()
    }, [locale, searchTerm, vinCode, selectedFeatures, selectedBrandId, sortBy, sortOrder, currentPage])

    // Safe page change handler
    const handlePageChange = (page) => {
        if (page >= 1 && page <= pagination.last_page) {
            setCurrentPage(page)
        }
    }

    // Set filtered cars directly from API response since filtering and pagination are done server-side
    useEffect(() => {
        setFilteredCars(cars)
    }, [cars])

    // No client-side pagination needed since it's handled by the API
    const currentCars = filteredCars
    const totalPages = pagination.last_page


    // Create skeleton cards for loading state
    const createSkeletonCards = () => {
        return Array.from({length: carsPerPage}, (_, index) => (
            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
                <div className={styles.skeletonImage}></div>
                <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonPrice}></div>
                </div>
            </div>
        ))
    }

    // Error state - only show if there's an error and no cars loaded
    if (error && cars.length === 0) {
        return (
            <div className={styles.automobilesPage}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h2>Xəta baş verdi</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className={styles.retryBtn}>
                        Yenidən cəhd et
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.automobilesPage}>
            {/* Hero Section */}
            <section className={styles.automobilesHero}>
                <div className={styles.heroBackground}>
                    <div className={styles.heroGradient}></div>
                    <div className={styles.heroPattern}></div>
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <div className={styles.badgeDot}></div>
                        <span>Premium Avtomobillər</span>
                    </div>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleMain}>Ən Yaxşı</span>
                        <span className={styles.titleHighlight}>Avtomobil Seçimi</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        <strong>Çin brendlərinin</strong> ən keyfiyyətli və müasir avtomobillərini kəşf edin.
                        BYD, Geely, Chery və digər tanınmış markaların geniş çeşidi.
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{cars.length}+</span>
                            <span className={styles.statLabel}>Model</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>5+</span>
                            <span className={styles.statLabel}>Marka</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Keyfiyyət</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.automobilesSection}>
                <div className={styles.automobilesGrid}>
                    {/* Filters Sidebar */}
                    <aside className={styles.filtersSidebar}>
                        <AutomobileFilters
                            features={features}
                            brands={brands}
                            locale={locale}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            vinCode={vinCode}
                            onVinChange={setVinCode}
                            selectedFeatures={selectedFeatures}
                            onFeaturesChange={setSelectedFeatures}
                            selectedBrandId={selectedBrandId}
                            onBrandChange={setSelectedBrandId}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={(field, order) => {
                                setSortBy(field)
                                setSortOrder(order)
                            }}
                        />
                    </aside>

                    {/* Cars Grid */}
                    <main className={styles.carsMain}>
                        {/* Results Header */}
                        <div className={styles.resultsHeader}>
                            <div className={styles.resultsInfo}>
                                <h2 className={styles.resultsTitle}>
                                    {pagination.total} avtomobil tapıldı
                                    {searchTerm && <span className={styles.searchTerm}>"{searchTerm}" üçün</span>}
                                </h2>
                                <p className={styles.resultsPage}>Səhifə {pagination.current_page} / {pagination.last_page} ({pagination.from}-{pagination.to} arası
                                    göstərilir)</p>
                            </div>
                            <div className={styles.viewToggle}>
                                <button
                                    className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                                    onClick={() => setViewMode('grid')}
                                    title="Grid görünümü"
                                >
                                    <i className="fas fa-th-large"></i>
                                </button>
                                <button
                                    className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                    onClick={() => setViewMode('list')}
                                    title="List görünümü"
                                >
                                    <i className="fas fa-list"></i>
                                </button>
                            </div>
                        </div>

                        {/* Cars Grid */}
                        <div className={`${styles.carsGrid} ${viewMode === 'list' ? styles.carsListView : ''}`}>
                            {loading ? (
                                // Show skeleton loading cards
                                createSkeletonCards()
                            ) : currentCars.length > 0 ? (
                                // Show actual cars
                                currentCars.map(car => (
                                    <AutomobileCard key={car.id} car={car} viewMode={viewMode}/>
                                ))
                            ) : (
                                // Show no cars found message
                                <div className={styles.noCars}>
                                    <div className={styles.noCarsIcon}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3>Heç bir avtomobil tapılmadı</h3>
                                    <p>Axtarış və ya filter şərtlərini dəyişdirməyi cəhd edin</p>
                                    <button onClick={() => {
                                        setSearchTerm('')
                                        setVinCode('')
                                        setSelectedFeatures([])
                                        setSelectedBrandId('')
                                        setSortBy('name')
                                        setSortOrder('asc')
                                    }} className={styles.resetBtn}>
                                        <i className="fas fa-refresh"></i>
                                        Filterləri Sıfırla
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {pagination.last_page > 1 && (
                            <AutomobilePagination
                                currentPage={pagination.current_page}
                                totalPages={pagination.last_page}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </main>
                </div>
            </section>
        </div>
    )
}
