'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import Footer from '@/components/Footer'
import RouteMap from '@/components/RouteMap'
import {translations} from '@/locales/translations'
import styles from './automobile-detail.module.css'

export default function AutomobileDetailClient({id, locale = 'az', initialData}) {
    const router = useRouter()
    const [car, setCar] = useState(initialData)
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState(initialData?.colors[0])
    const [loading, setLoading] = useState(!initialData)
    const [error, setError] = useState(null)
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({x: 0, y: 0})
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [touchStart, setTouchStart] = useState({x: 0, y: 0})

    // Get translations for current locale
    const t = translations[locale] || translations.az

    useEffect(() => {
        console.log('AutomobileDetailClient', initialData)
    }, [])

    const handleContactDealer = () => {
        if (car?.dealer?.phone) {
            window.open(`tel:${car.dealer.phone}`)
        }
    }

    const handleRequestQuote = () => {
        // In a real app, this would open a contact form or redirect to a quote page
        alert(t.automobileDetail?.alerts?.quoteRequested || 'Qiymət sorğusu göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.')
    }

    const handleImageZoom = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomPosition({x, y})
    }

    const handleMouseEnter = () => {
        setIsZoomed(true)
    }

    const handleMouseLeave = () => {
        setIsZoomed(false)
    }

    const openFullscreen = () => {
        setIsFullscreen(true)
        document.body.style.overflow = 'hidden'
    }

    const closeFullscreen = () => {
        setIsFullscreen(false)
        document.body.style.overflow = 'auto'
    }

    const nextImage = () => {
        if (car.images && car.images.length > 0) {
            setSelectedImage((prev) => (prev + 1) % car.images.length)
        }
    }

    const prevImage = () => {
        if (car.images && car.images.length > 0) {
            setSelectedImage((prev) => (prev - 1 + car.images.length) % car.images.length)
        }
    }

    const handleTouchStart = (e) => {
        setTouchStart({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        })
    }

    const handleTouchEnd = (e) => {
        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        }

        const deltaX = touchStart.x - touchEnd.x
        const deltaY = Math.abs(touchStart.y - touchEnd.y)

        // Swipe detection
        if (Math.abs(deltaX) > 50 && deltaY < 100) {
            if (deltaX > 0) {
                nextImage()
            } else {
                prevImage()
            }
        }
    }


    const shareProduct = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: car.name,
                    text: `${car.brand} ${car.name}`,
                    url: window.location.href
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href)
            alert(t.automobileDetail?.alerts?.linkCopied || 'Link kopyalandı!')
        }
    }

    if (loading) {
        return (
            <>
                <div className={styles.loading}>
                    <div className={styles.loadingSpinner}></div>
                    <p>{t.automobileDetail?.loading || 'Yüklənir...'}</p>
                </div>
                <Footer/>
            </>
        )
    }

    // if (error) {
    //   return (
    //     <>
    //       <div className={styles.notFound}>
    //         <h1>{t.automobileDetail?.error || 'Xəta baş verdi'}</h1>
    //         <p>{t.automobileDetail?.errorMessage || 'Avtomobil məlumatları yüklənərkən xəta baş verdi'}: {error}</p>
    //         <button onClick={() => router.push('/automobiles')} className={styles.backButton}>
    //           {t.automobileDetail?.backToAutomobiles || 'Avtomobillərə qayıt'}
    //         </button>
    //       </div>
    //       <Footer />
    //     </>
    //   )
    // }

    if (!car) {
        return (
            <>
                <div className={styles.notFound}>
                    <h1>{t.automobileDetail?.notFound || 'Avtomobil tapılmadı'}</h1>
                    <p>{t.automobileDetail?.notFoundMessage || 'Axtardığınız avtomobil mövcud deyil.'}</p>
                    <button onClick={() => router.push('/automobiles')} className={styles.backButton}>
                        {t.automobileDetail?.backToAutomobiles || 'Avtomobillərə qayıt'}
                    </button>
                </div>
                <Footer/>
            </>
        )
    }
    console.log(car.brand)
    return (
        <>

            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
                <div className="container">
                    <a href={`/?locale=${locale}`}>{t.automobileDetail?.breadcrumb?.home || 'Ana Səhifə'}</a>
                    <span>/</span>
                    <a href={`/automobiles?locale=${locale}`}>{t.automobileDetail?.breadcrumb?.automobiles || 'Avtomobillər'}</a>
                    <span>/</span>
                    <span>{car.name}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.detailContainer}>
                <div className="container">
                    <div className={styles.detailGrid}>

                        {/* Image Gallery */}
                        <div className={styles.imageSection}>
                            <div className={styles.mainImageContainer}>
                                <div
                                    className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}
                                    onMouseMove={handleImageZoom}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {car.images && car.images.length > 0 ? (
                                        <img
                                            src={car.images[selectedImage]}
                                            alt={car.name}
                                            className={styles.carImage}
                                            style={isZoomed ? {
                                                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                                                transform: 'scale(2)'
                                            } : {}}
                                        />
                                    ) : (
                                        <div className={styles.noImage}>
                                            <i className="fas fa-car"></i>
                                            <p>{t.automobileDetail?.noImage || 'Şəkil mövcud deyil'}</p>
                                        </div>
                                    )}

                                    {/* Image Controls */}
                                    <div className={styles.imageControls}>
                                        <button
                                            className={styles.controlBtn}
                                            onClick={openFullscreen}
                                            title={t.automobileDetail?.imageControls?.fullscreen || 'Tam ekran'}
                                        >
                                            <i className="fas fa-expand"></i>
                                        </button>
                                        <button
                                            className={styles.controlBtn}
                                            onClick={shareProduct}
                                            title={t.automobileDetail?.imageControls?.share || 'Paylaş'}
                                        >
                                            <i className="fas fa-share-alt"></i>
                                        </button>
                                    </div>

                                    {/* Navigation Arrows */}
                                    {car.images && car.images.length > 1 && (
                                        <>
                                            <button
                                                className={`${styles.navArrow} ${styles.prevArrow}`}
                                                onClick={prevImage}
                                            >
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                            <button
                                                className={`${styles.navArrow} ${styles.nextArrow}`}
                                                onClick={nextImage}
                                            >
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                        </>
                                    )}

                                    {/* Image Counter */}
                                    {car.images && car.images.length > 0 && (
                                        <div className={styles.imageCounter}>
                                            {selectedImage + 1} / {car.images.length}
                                        </div>
                                    )}

                                    {!car.inStock && (
                                        <div className={styles.outOfStockBadge}>Stokda yoxdur</div>
                                    )}

                                  
                                </div>
                            </div>

                            {car.images && car.images.length > 0 && (
                                <div className={styles.thumbnails}>
                                    {car.images.map((image, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                                            onClick={() => setSelectedImage(index)}
                                        >
                                            <img src={image} alt={`${car.name} ${index + 1}`}/>
                                            <div className={styles.thumbnailOverlay}>
                                                <i className="fas fa-eye"></i>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Car Info */}
                        <div className={styles.infoSection}>
                            <div className={styles.carHeader}>
                                {
                                    car.brand &&
                                    <div className={styles.brandBadge}>{car.brand}</div>
                                }
                                <h1 className={styles.carTitle}>{car.name}</h1>
                                <div className={styles.carMeta}>
                                    {car.number && <span className={styles.number}>№: {car.number}</span>}
                                    <span className={styles.year}>{car.year}</span>
                                    <span className={styles.type}>{car.type}</span>
                                    <span className={styles.fuel}>{car.fuel}</span>
                                </div>
                                {(car.location || car.current_location) && (
                                    <div className={styles.locationInfo}>
                                        {car.location && <span className={styles.location}>📍 {car.location}</span>}
                                        {car.current_location && car.current_location !== car.location && (
                                            <span
                                                className={styles.currentLocation}>📍 {t.automobileDetail?.location?.current || 'Hazırda'}: {car.current_location}</span>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className={styles.priceSection}>
                                <div className={styles.priceContact}>
                                    <span
                                        className={styles.priceLabel}>{t.automobileDetail?.priceContact || 'Qiymət üçün əlaqə saxlayın'}</span>
                                </div>
                                {car.inStock && (
                                    <div className={styles.stockInfo}>
                                        <span
                                            className={styles.stockBadge}>{t.automobileDetail?.available || 'Mövcuddur'}</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.description}>
                                <p>{car.description}</p>
                            </div>

                            {/* Color Selection */}
                            <div className={styles.colorSection}>
                                <h3>{t.automobileDetail?.colorSelection || 'Rəng seçimi'}</h3>
                                <div className={styles.colors}>
                                    {car.colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons
                            <div className={styles.actions}>
                                <button
                                    className={styles.primaryButton}
                                    onClick={handleRequestQuote}
                                    disabled={!car.inStock}
                                >
                                    {car.inStock ? (t.automobileDetail?.actions?.requestQuote || 'Qiymət soruş') : (t.automobileDetail?.outOfStock || 'Stokda yoxdur')}
                                </button>
                                <button
                                    className={styles.secondaryButton}
                                    onClick={handleContactDealer}
                                >
                                    {t.automobileDetail?.actions?.contactDealer || 'Diler ilə əlaqə'}
                                </button>
                            </div> */}

                            {/* Features */}
                            <div className={styles.features}>
                                <h3>{t.automobileDetail?.features || 'Xüsusiyyətlər'}</h3>
                                <div className={styles.featuresList}>
                                    {car.features.map((feature, index) => (
                                        <span key={index} className={styles.feature}>
                      {feature}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Route Map */}
                    {car.route && (
                        <RouteMap route={car.route} car={car} locale={locale}/>
                    )}

                    {/* Specifications */}
                    <div className={styles.specificationsSection}>
                        <div className={styles.specsHeader}>
                            <h2>{t.automobileDetail?.specifications?.title || 'Texniki xüsusiyyətlər'}</h2>
                            <p>{t.automobileDetail?.specifications?.subtitle || 'Avtomobilin ətraflı texniki parametrləri'}</p>
                        </div>

                        <div className={styles.specsContainer}>
                            {/* Performance Specs */}
                            <div className={styles.specCategory}>
                                <div className={styles.categoryHeader}>
                                    <div className={styles.categoryIcon}>
                                        <i className="fas fa-tachometer-alt"></i>
                                    </div>
                                    <h3>{t.automobileDetail?.specifications?.performance || 'Performans'}</h3>
                                </div>
                                <div className={styles.categorySpecs}>
                                    {car.specifications.engine && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.engine || 'Mühərrik'}</span>
                                            <span className={styles.specValue}>{car.specifications.engine}</span>
                                        </div>
                                    )}
                                    {car.specifications.power && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.power || 'Güc'}</span>
                                            <span className={styles.specValue}>{car.specifications.power}</span>
                                        </div>
                                    )}
                                    {car.specifications.torque && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.torque || 'Fırlanma momenti'}</span>
                                            <span className={styles.specValue}>{car.specifications.torque}</span>
                                        </div>
                                    )}
                                    {car.specifications.acceleration && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.acceleration || 'Sürətlənmə'}</span>
                                            <span className={styles.specValue}>{car.specifications.acceleration}</span>
                                        </div>
                                    )}
                                    {car.specifications.topSpeed && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.maxSpeed || 'Maksimal sürət'}</span>
                                            <span className={styles.specValue}>{car.specifications.topSpeed}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Electric/Fuel Specs */}
                            {(car.specifications.range || car.specifications.battery || car.specifications.charging || car.specifications.fuelConsumption) && (
                                <div className={styles.specCategory}>
                                    <div className={styles.categoryHeader}>
                                        <div className={styles.categoryIcon}>
                                            <i className={car.fuel === 'Electric' ? "fas fa-bolt" : "fas fa-gas-pump"}></i>
                                        </div>
                                        <h3>{car.fuel === 'Electric' ? (t.automobileDetail?.specifications?.electricSystem || 'Elektrik sistemi') : (t.automobileDetail?.specifications?.fuelSystem || 'Yanacaq sistemi')}</h3>
                                    </div>
                                    <div className={styles.categorySpecs}>
                                        {car.specifications.range && (
                                            <div className={styles.specItem}>
                                                <span
                                                    className={styles.specLabel}>{t.automobileDetail?.specifications?.range || 'Məsafə'}</span>
                                                <span className={styles.specValue}>{car.specifications.range}</span>
                                            </div>
                                        )}
                                        {car.specifications.battery && (
                                            <div className={styles.specItem}>
                                                <span
                                                    className={styles.specLabel}>{t.automobileDetail?.specifications?.battery || 'Batareya'}</span>
                                                <span className={styles.specValue}>{car.specifications.battery}</span>
                                            </div>
                                        )}
                                        {car.specifications.charging && (
                                            <div className={styles.specItem}>
                                                <span
                                                    className={styles.specLabel}>{t.automobileDetail?.specifications?.charging || 'Doldurma'}</span>
                                                <span className={styles.specValue}>{car.specifications.charging}</span>
                                            </div>
                                        )}
                                        {car.specifications.fuelConsumption && (
                                            <div className={styles.specItem}>
                                                <span
                                                    className={styles.specLabel}>{t.automobileDetail?.specifications?.fuelConsumption || 'Yanacaq sərfiyyatı'}</span>
                                                <span
                                                    className={styles.specValue}>{car.specifications.fuelConsumption}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* General Specs */}
                            <div className={styles.specCategory}>
                                <div className={styles.categoryHeader}>
                                    <div className={styles.categoryIcon}>
                                        <i className="fas fa-cog"></i>
                                    </div>
                                    <h3>{t.automobileDetail?.specifications?.general || 'Ümumi məlumatlar'}</h3>
                                </div>
                                <div className={styles.categorySpecs}>
                                    {car.specifications.drivetrain && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.drivetrain || 'Ötürücü'}</span>
                                            <span className={styles.specValue}>{car.specifications.drivetrain}</span>
                                        </div>
                                    )}
                                    {car.specifications.seating && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.seating || 'Oturacaq sayı'}</span>
                                            <span className={styles.specValue}>{car.specifications.seating}</span>
                                        </div>
                                    )}
                                    {car.specifications.warranty && (
                                        <div className={styles.specItem}>
                                            <span
                                                className={styles.specLabel}>{t.automobileDetail?.specifications?.warranty || 'Zəmanət'}</span>
                                            <span className={styles.specValue}>{car.specifications.warranty}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dealer Info */}
                    <div className={styles.dealerSection}>
                        <h2>{t.automobileDetail?.dealer?.title || 'Diler məlumatları'}</h2>
                        <div className={styles.dealerCard}>
                            <div className={styles.dealerInfo}>
                                <h3>{car.dealer.name}</h3>
                                <p className={styles.dealerAddress}>{car.dealer.address}</p>
                                <div className={styles.dealerContact}>
                                    <a href={`tel:${car.dealer.phone}`} className={styles.dealerPhone}>
                                        {car.dealer.phone}
                                    </a>
                                    <a href={`mailto:${car.dealer.email}`} className={styles.dealerEmail}>
                                        {car.dealer.email}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.dealerActions}>
                                <button onClick={handleContactDealer} className={styles.contactButton}>
                                    {t.automobileDetail?.actions?.callNow || 'İndi zəng et'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            {isFullscreen && car.images && car.images.length > 0 && (
                <div className={styles.fullscreenModal} onClick={closeFullscreen}>
                    <div className={styles.fullscreenContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeFullscreen} onClick={closeFullscreen}>
                            <i className="fas fa-times"></i>
                        </button>

                        <div className={styles.fullscreenImageContainer}>
                            <img
                                src={car.images[selectedImage]}
                                alt={car.name}
                                className={styles.fullscreenImage}
                            />

                            {/* Fullscreen Navigation */}
                            {car.images.length > 1 && (
                                <>
                                    <button
                                        className={`${styles.fullscreenArrow} ${styles.prevArrow}`}
                                        onClick={prevImage}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <button
                                        className={`${styles.fullscreenArrow} ${styles.nextArrow}`}
                                        onClick={nextImage}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </>
                            )}

                            <div className={styles.fullscreenCounter}>
                                {selectedImage + 1} / {car.images.length}
                            </div>
                        </div>

                        {/* Fullscreen Thumbnails */}
                        <div className={styles.fullscreenThumbnails}>
                            {car.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`${styles.fullscreenThumbnail} ${selectedImage === index ? styles.active : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={image} alt={`${car.name} ${index + 1}`}/>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <Footer/>
        </>
    )
}


// Transform API data to component structure
// const transformApiData = (apiData) => {
//   return {
//     id: apiData.id,
//     name: apiData.name,
//     brand: apiData.brand?.name || 'Unknown',
//     number: apiData.number,
//     location: apiData.location,
//     current_location: apiData.current_location,
//     departure_date: apiData.departure_date,
//     expected_arrival_time: apiData.expected_arrival_time,
//     route: apiData.route,
//     journey_tracking: apiData.journey_tracking,
//     journey_started: apiData.journey_started,
//     journey_completed: apiData.journey_completed,
//     journey_status: apiData.journey_status,
//     year: new Date().getFullYear(), // Default to current year if not provided
//     images: apiData.images?.map(img => img.url) || [],
//     type: 'SUV', // Default type, could be derived from other data
//     fuel: apiData.technical_specification?.fuel?.type || 'Unknown',
//     transmission: 'Automatic', // Default, could be from API
//     features: apiData.features?.map(f => f.name) || [],
//     description: apiData.brand?.description || t.automobileDetail?.notFoundMessage || 'Avtomobilin təsviri mövcud deyil.',
//     specifications: {
//       engine: apiData.technical_specification?.engine_type,
//       power: apiData.technical_specification?.power,
//       torque: apiData.technical_specification?.torque,
//       acceleration: apiData.technical_specification?.acceleration,
//       topSpeed: apiData.technical_specification?.max_speed,
//       range: apiData.technical_specification?.range,
//       battery: apiData.technical_specification?.battery_capacity,
//       charging: apiData.technical_specification?.charging_time,
//       drivetrain: apiData.technical_specification?.drivetrain,
//       seating: apiData.technical_specification?.seats,
//       warranty: apiData.technical_specification?.warranty,
//       fuelConsumption: apiData.technical_specification?.fuel?.consumption,
//       dimensions: apiData.technical_specification?.dimensions
//     },
//     inStock: true, // Default to true, could be derived from API
//     stockCount: 1, // Default value
//     colors: apiData.color ? [apiData.color.name] : [t.automobileDetail?.colorSelection || 'Qara'],
//     dealer: {
//       name: t.automobileDetail?.dealer?.name || 'Autonova Bakı',
//       phone: '+994 12 555 0123',
//       address: t.automobileDetail?.dealer?.address || 'Bakı şəhəri, Nəsimi rayonu',
//       email: 'info@autonova.az'
//     }
//   }
// }

// Initialize with SSR data or fetch from API
// useEffect(() => {
//   if (initialData) {
//     // Use SSR data
//     const transformedCar = transformApiData(initialData)
//     setCar(transformedCar)
//     if (transformedCar.colors.length > 0) {
//       setSelectedColor(transformedCar.colors[0])
//     }
//     setLoading(false)
//   } else {
//     // Fetch from API (fallback)
//     const fetchAutomobile = async () => {
//       try {
//         setLoading(true)
//         setError(null)
//
//         const response = await fetch(`${BASE_URL}/automobiles/${id}`)
//
//         console.log(response)
//
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//
//         const result = await response.json()
//
//         if (result.success && result.data) {
//           const transformedCar = transformApiData(result.data)
//           setCar(transformedCar)
//           if (transformedCar.colors.length > 0) {
//             setSelectedColor(transformedCar.colors[0])
//           }
//         } else {
//           throw new Error('Invalid API response')
//         }
//       } catch (err) {
//         console.error('Error fetching automobile:', err)
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//
//     if (id) {
//       fetchAutomobile()
//     }
//   }
// }, [id, initialData, t])
