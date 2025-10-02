'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams as useClientSearchParams } from 'next/navigation'
import AutomobileCard from '@/components/AutomobileCard'
import AutomobileFilters from '@/components/AutomobileFilters'
import AutomobilePagination from '@/components/AutomobilePagination'
import styles from './automobiles.module.css'
import BASE_URL from '@/utils/baseurl'

export default function AutomobilesClient({ locale, features, brands, initialSearchParams }) {
    const router = useRouter()
    const clientSearchParams = useClientSearchParams()

    const getSearchParamsAsURLSearchParams = useCallback((paramsObject) => {
        const urlParams = new URLSearchParams();
        if (paramsObject) {
            for (const key in paramsObject) {
                if (Array.isArray(paramsObject[key])) {
                    paramsObject[key].forEach(value => urlParams.append(key, value));
                } else {
                    urlParams.set(key, paramsObject[key]);
                }
            }
        }
        return urlParams;
    }, []);

    const getFilterStateFromURL = useCallback((paramsUrlSearchParams) => {
        return {
            searchTerm: paramsUrlSearchParams.get('search') || '',
            vinCode: paramsUrlSearchParams.get('vin') || '',
            // Feature ID'lerini string olarak tutmak ve karşılaştırmak için filter(Boolean) kullanın
            selectedFeatures: paramsUrlSearchParams.get('features')?.split(',').filter(Boolean) || [],
            selectedBrandId: paramsUrlSearchParams.get('brand') || '',
            sortBy: paramsUrlSearchParams.get('sortBy') || 'name',
            sortOrder: paramsUrlSearchParams.get('sortOrder') || 'asc',
            currentPage: parseInt(paramsUrlSearchParams.get('page') || '1', 10),
            viewMode: paramsUrlSearchParams.get('viewMode') || 'grid'
        };
    }, []);

    // Başlangıç state'ini server'dan gelen `initialSearchParams` ile ayarla
    const [filterState, setFilterState] = useState(() =>
        getFilterStateFromURL(getSearchParamsAsURLSearchParams(initialSearchParams))
    );

    const {
        searchTerm, vinCode, selectedFeatures, selectedBrandId,
        sortBy, sortOrder, currentPage, viewMode
    } = filterState;

    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0,
        from: 0,
        to: 0
    })

    // --- Hata Çözümü için Yeni Yaklaşım ---
    // Bu useEffect, `filterState` her değiştiğinde URL'yi güncelleyecek.
    // Bu, `router.push`'u bir render döngüsü içinde çağırma hatasını önler.
    useEffect(() => {
        const newURLParams = new URLSearchParams(clientSearchParams.toString());

        // Locale parametresini yönet
        if (locale && locale !== "az") {
            newURLParams.set("locale", locale);
        } else {
            newURLParams.delete("locale");
        }

        // `filterState`'deki değerleri `newURLParams`'a dönüştür
        const currentFilters = {
            search: searchTerm,
            vin: vinCode,
            features: selectedFeatures.length > 0 ? selectedFeatures.join(',') : '', // boşsa sil
            brand: selectedBrandId,
            sortBy: sortBy,
            sortOrder: sortOrder,
            page: currentPage,
            viewMode: viewMode
        };

        Object.entries(currentFilters).forEach(([key, value]) => {
            if (value === '' || (Array.isArray(value) && value.length === 0) || value === null || value === undefined) {
                newURLParams.delete(key);
            } else {
                newURLParams.set(key, String(value));
            }
        });

        const currentPathname = window.location.pathname;
        const newURL = `${currentPathname}?${newURLParams.toString()}`;

        // Sadece URL gerçekten değişmişse `router.push`'u çağır
        // Bu, gereksiz navigasyonları ve re-render'ları önler.
        if (router.asPath !== newURL) { // Next.js Pages Router için asPath, App Router için pathname + search
            // App Router için: window.location.pathname + window.location.search
            const currentFullURL = window.location.pathname + window.location.search;
            if (currentFullURL !== newURL) {
                 router.push(newURL, { scroll: false });
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterState, locale, router, clientSearchParams]); // filterState, locale, router, clientSearchParams değiştiğinde tetikle


    // URL'deki `clientSearchParams` değiştiğinde component state'ini güncelle
    // Bu, tarayıcının geri/ileri tuşları ile URL değiştiğinde state'in senkronize olmasını sağlar.
    useEffect(() => {
        setFilterState(getFilterStateFromURL(clientSearchParams));
    }, [clientSearchParams, getFilterStateFromURL]);


    // Handle fonksiyonları artık sadece `filterState`'i güncelleyecek
    // URL güncellemesi `useEffect` tarafından otomatik yapılacak
    const handleFilterChange = useCallback((key, value) => {
        setFilterState(prev => {
            const newState = { ...prev, [key]: value };
            if (key !== 'currentPage' && key !== 'viewMode') {
                newState.currentPage = 1; // Başka bir filtre değiştiğinde sayfayı sıfırla
            }
            return newState;
        });
    }, []);

    const handleSearchChange = (value) => handleFilterChange('searchTerm', value);
    const handleVinChange = (value) => handleFilterChange('vinCode', value);
    const handleFeaturesChange = (value) => handleFilterChange('selectedFeatures', value);
    const handleBrandChange = (value) => handleFilterChange('selectedBrandId', value);
    const handleSortChange = (field, order) => {
        setFilterState(prev => ({
            ...prev,
            sortBy: field,
            sortOrder: order,
            currentPage: 1 // Sıralama değiştiğinde sayfayı sıfırla
        }));
    };
    const handlePageChange = (page) => handleFilterChange('currentPage', page);
    const handleViewModeChange = (mode) => handleFilterChange('viewMode', mode);

    const clearAllFilters = useCallback(() => {
        const resetState = {
            searchTerm: '',
            vinCode: '',
            selectedFeatures: [],
            selectedBrandId: '',
            sortBy: 'name',
            sortOrder: 'asc',
            currentPage: 1,
            viewMode: 'grid'
        };
        setFilterState(resetState);
    }, []);


    // API'den otomobil verilerini çekme işlemi
    // Bu useEffect, `clientSearchParams` her değiştiğinde (URL değiştiğinde) tetiklenecek
    useEffect(() => {
        const fetchAutomobiles = async () => {
            try {
                setLoading(true);
                setError(null);

                const queryParams = new URLSearchParams();
                queryParams.append('locale', locale);

                // `clientSearchParams`'tan mevcut tüm arama parametrelerini al
                // ve API'nin beklediği isimlere dönüştürerek ekle
                for (const [key, value] of clientSearchParams.entries()) {
                    if (key === 'locale') continue;

                    switch (key) {
                        case 'features':
                            queryParams.append('feature_ids', value);
                            break;
                        case 'brand':
                            queryParams.append('brand_id', value);
                            break;
                        case 'sortBy':
                            queryParams.append('order_by', value);
                            break;
                        case 'sortOrder':
                            queryParams.append('order_direction', value);
                            break;
                        case 'page':
                            queryParams.append('page', value);
                            break;
                        case 'per_page':
                            queryParams.append('per_page', value);
                            break;
                        default:
                            queryParams.append(key, value);
                            break;
                    }
                }

                if (!clientSearchParams.has('per_page')) {
                    queryParams.append('per_page', String(pagination.per_page));
                }

                const response = await fetch(`${BASE_URL}/view-automobiles?${queryParams.toString()}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && result.data) {
                    const transformedCars = result.data.map(car => ({
                        id: car.id,
                        name: car.name,
                        vin: car.vin,
                        image: car.first_image?.url || car.first_image?.thumb_url || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
                        features: car.features?.map(f => f.name) || [],
                        featureDetails: car.features || [],
                        brand: car.brand?.name || 'Unknown Brand',
                        brandId: car.brand?.id,
                        year: car.year || 2024,
                        price: car.price || 0,
                        description: car.description || '',
                        inStock: car.inStock !== undefined ? car.inStock : true,
                        departure_date: car.departure_date,
                        created_at: car.created_at,
                        updated_at: car.updated_at
                    }));

                    setCars(transformedCars);

                    if (result.pagination) {
                        setPagination(result.pagination);
                    }
                } else {
                    throw new Error('Invalid API response format');
                }
            } catch (err) {
                console.error('Error fetching automobiles:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAutomobiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clientSearchParams, locale]); // API çağrısını clientSearchParams değiştiğinde tetikle


    const currentCars = cars;
    const totalPages = pagination.last_page;

    const createSkeletonCards = () => {
        return Array.from({ length: pagination.per_page }, (_, index) => (
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

    if (error && cars.length === 0 && !loading) {
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
                        <strong>Çin brendlərinin</strong> ən keyfiyyətli ve müasir avtomobillərini kəşf edin.
                        BYD, Geely, Chery və digər tanınmış markaların geniş çeşidi.
                    </p>
                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{pagination.total}+</span>
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
                            onSearchChange={handleSearchChange}
                            vinCode={vinCode}
                            onVinChange={handleVinChange}
                            selectedFeatures={selectedFeatures}
                            onFeaturesChange={handleFeaturesChange}
                            selectedBrandId={selectedBrandId}
                            onBrandChange={handleBrandChange}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSortChange={handleSortChange}
                            onClearFilters={clearAllFilters}
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
                                    onClick={() => handleViewModeChange('grid')}
                                    title="Grid görünümü"
                                >
                                    <i className="fas fa-th-large"></i>
                                </button>
                                <button
                                    className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                                    onClick={() => handleViewModeChange('list')}
                                    title="List görünümü"
                                >
                                    <i className="fas fa-list"></i>
                                </button>
                            </div>
                        </div>

                        {/* Cars Grid */}
                        <div className={`${styles.carsGrid} ${viewMode === 'list' ? styles.carsListView : ''}`}>
                            {loading ? (
                                createSkeletonCards()
                            ) : currentCars.length > 0 ? (
                                currentCars.map(car => (
                                    <AutomobileCard key={car.id} car={car} viewMode={viewMode}/>
                                ))
                            ) : (
                                <div className={styles.noCars}>
                                    <div className={styles.noCarsIcon}>
                                        <i className="fas fa-search"></i>
                                    </div>
                                    <h3>Heç bir avtomobil tapılmadı</h3>
                                    <p>Axtarış və ya filter şərtlərini dəyişdirməyi cəhd edin</p>
                                    <button onClick={clearAllFilters} className={styles.resetBtn}>
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