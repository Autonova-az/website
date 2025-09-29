'use client'

import { useState, useEffect } from 'react'
import { translations } from '@/locales/translations'
import styles from './RouteMap.module.css'

export default function RouteMap({ route, car, locale = 'az' }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showMapModal, setShowMapModal] = useState(false)
  const [selectedMapData, setSelectedMapData] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  if (!route || !route.stops || route.stops.length === 0) {
    return null
  }

  const t = translations[locale]?.automobileDetail?.route || translations.az.automobileDetail.route

  // Calculate journey statistics with new API data
const calculateJourneyStats = (route) => {
  const startTime = new Date(car.departure_date)
  const endTime = new Date(car.expected_arrival_time)
  const now = new Date()

  let daysOnRoad = 0
  let daysRemaining = 0
  let totalDays = car.journey_tracking.total_days

  // Əgər səfər başlamayıbsa
  if (!car.journey_tracking.journey_started) {
    daysOnRoad = 0
    daysRemaining = totalDays
  }
  // Əgər səfər bitibsə
  else if (car.journey_tracking.journey_completed) {
    daysOnRoad = Math.ceil(
      (new Date(route.expected_arrival_time) - startTime) / (1000 * 60 * 60 * 24)
    )
    daysRemaining = 0
  }
  // Əgər səfər davam edirsə
  else {
    daysOnRoad = Math.max(1, Math.ceil(car.journey_tracking.elapsed_hours / 24))
    daysRemaining = Math.max(0, totalDays - daysOnRoad)
  }

  const progress = Math.max(0, Math.min(100, car.journey_tracking.progress_percentage))

  return {
    daysOnRoad,
    daysRemaining,
    totalDays,
    progress,
    currentDay: car.journey_tracking.current_day,
    status: car.journey_tracking.status,
    message: car.journey_tracking.message,
    currentLocation: car.journey_tracking.current_location,
  }
}


  // Calculate progress percentage with journey status
const calculateProgress = () => {
  if (!car.journey_tracking) return 0

  if (car.journey_tracking.journey_completed || car.journey_tracking.status === "completed") {
    return 100
  }

  if (!car.journey_tracking.journey_started) {
    return 0
  }

  return Math.max(0, Math.min(100, car.journey_tracking.progress_percentage || 0))
}


  // Get current stop
  const getCurrentStop = () => {
    const tracking = car.journey_tracking || {}

    // Əgər artıq tamamlanıbsa, heç bir current stop qaytarma
    if (tracking.journey_completed || tracking.status === "completed") {
      return null
    }

    // Normal qaydada davam et
    const currentStop = route.stops.find(stop => stop.status?.is_current)
    if (currentStop) return currentStop

    return route.stops.find(stop => stop.is_current) || route.stops[0]
  }

  const journeyStats = calculateJourneyStats()
  const progress = calculateProgress()
  const currentStop = getCurrentStop()
  const completedStops = (() => {
    const tracking = car.journey_tracking || {}

    // If journey is completed, all stops are completed
    if (tracking.journey_completed || tracking.journey_status === 'completed') {
      return route.stops.length
    }

    if (!tracking.journey_started) {
      return 0
    }

    // Count completed stops based on status
    return route.stops.filter((stop, index) => {
      if (stop.status) {
        return stop.status.status === 'completed'
      }

      // Fallback to old structure
      const currentIndex = route.stops.findIndex(s => s.status?.is_current || s.is_current)
      return currentIndex !== -1 ? index < currentIndex : false
    }).length
  })()

  // Map modal functions
  const openMapModal = (mapData, title) => {
    setSelectedMapData({ ...mapData, title })
    setShowMapModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeMapModal = () => {
    setShowMapModal(false)
    setSelectedMapData(null)
    document.body.style.overflow = 'auto'
  }

  // Generate static map image URL for preview
  const generateStaticMapUrl = (coordinates) => {
    if (!coordinates || !coordinates.latitude || !coordinates.longitude) return null

    const { latitude, longitude } = coordinates
    return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`
  }

  return (
    <div className={styles.routeMapContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <i className="fas fa-route"></i>
          {t.routeProgress}
        </h2>
        <div className={styles.routeName}>{route.name}</div>

        {/* Journey Status Badge */}
        <div className={styles.journeyStatusBadge}>
          {journeyStats.journeyCompleted ? (
            <div className={`${styles.statusBadge} ${styles.completed}`}>
              <i className="fas fa-check-circle"></i>
              <span>{t.journeyCompleted || 'Səyahət Tamamlandı'}</span>
            </div>
          ) : journeyStats.journeyStarted ? (
            <div className={`${styles.statusBadge} ${styles.inProgress}`}>
              <i className="fas fa-shipping-fast"></i>
              <span>{t.journeyInProgress || 'Səyahət Davam Edir'}</span>
            </div>
          ) : (
            <div className={`${styles.statusBadge} ${styles.pending}`}>
              <i className="fas fa-clock"></i>
              <span>{t.journeyPending || 'Səyahət Başlamayıb'}</span>
            </div>
          )}

        </div>
      </div>

      {/* Journey Tracking Message */}
      {journeyStats.trackingMessage && (
        <div className={styles.trackingMessage}>
          <div className={styles.trackingIcon}>
            <i className="fas fa-info-circle"></i>
          </div>
          <span>{journeyStats.trackingMessage}</span>
        </div>
      )}

      {/* Journey Statistics */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className={journeyStats.journeyStarted ? "fas fa-calendar-day" : "fas fa-calendar-plus"}></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {journeyStats.journeyStarted ? journeyStats.daysOnRoad : 0}
            </div>
            <div className={styles.statLabel}>
              {journeyStats.journeyStarted ? t.daysOnRoad : (t.waitingToStart || 'Başlamaq üçün gözləyir')}
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className={journeyStats.journeyCompleted ? "fas fa-flag-checkered" : "fas fa-hourglass-half"}></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {journeyStats.journeyCompleted ? 0 : journeyStats.daysRemaining}
            </div>
            <div className={styles.statLabel}>
              {journeyStats.journeyCompleted ? (t.journeyFinished || 'Səyahət Bitdi') : t.daysRemaining}
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{completedStops}/{route.stops.length}</div>
            <div className={styles.statLabel}>{t.completedStops}</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-route"></i>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {journeyStats.totalDurationHours > 24
                ? `${Math.round(journeyStats.totalDurationHours / 24)}d`
                : `${Math.round(journeyStats.totalDurationHours)}h`}
            </div>
            <div className={styles.statLabel}>{t.totalJourneyTime || 'Ümumi Müddət'}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>{t.routeProgress}</span>
          <span className={styles.progressPercentage}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Location */}
      <div className={styles.currentLocationCard}>
        <div className={styles.currentLocationHeader}>
          <i className={
            journeyStats.journeyCompleted ? "fas fa-flag-checkered" :
              journeyStats.journeyStarted ? "fas fa-location-dot" :
                "fas fa-clock"
          }></i>
          <span>
            {journeyStats.journeyCompleted ? (t.finalDestination || 'Son Təyinat') :
              journeyStats.journeyStarted ? t.currentLocation :
                (t.startingPoint || 'Başlanğıc Nöqtəsi')}
          </span>
        </div>
        <div className={styles.currentLocationContent}>
          {journeyStats.journeyCompleted ? (
            <>
              <h3>{route.route_map?.destination?.stop_name || 'Təyinat'}</h3>
              <p>{route.route_map?.destination?.full_location}</p>
              <div className={styles.completedMessage}>
                <i className="fas fa-check-circle"></i>
                <span>{t.journeyCompletedMessage || 'Avtomobil təyinat nöqtəsinə çatdı!'}</span>
              </div>
            </>
          ) : journeyStats.journeyCompleted ? (
            <>
              <h3>{route.route_map?.destination?.stop_name || 'Təyinat'}</h3>
              <p>{route.route_map?.destination?.full_location}</p>
              <div className={styles.completedMessage}>
                <i className="fas fa-check-circle"></i>
                <span>{t.journeyCompletedMessage || 'Avtomobil təyinat nöqtəsinə çatdı!'}</span>
              </div>
            </>
          )

            : journeyStats.journeyStarted && currentStop ? (
              <>
                <h3>{currentStop.stop_name}</h3>
                <p>{currentStop.full_location}</p>
                {currentStop.location_details && (
                  <p className={styles.locationDetails}>{currentStop.location_details}</p>
                )}
              </>
            ) : (
              <>
                <h3>{route.route_map?.origin?.stop_name || 'Başlanğıc'}</h3>
                <p>{route.route_map?.origin?.full_location}</p>
                <div className={styles.pendingMessage}>
                  <i className="fas fa-hourglass-start"></i>
                  <span>{t.journeyNotStartedMessage || 'Avtomobil hələ yola düşməyib'}</span>
                </div>
              </>
            )}
        </div>
      </div>

      {/* Interactive Route Map */}
      {route.route_map && (
        <div className={styles.interactiveMapSection}>
          <h3 className={styles.mapSectionTitle}>
            <i className="fas fa-map"></i>
            {t.interactiveMap || 'İnteraktiv Xəritə'}
          </h3>

          <div className={styles.mapGrid}>
            {/* Origin Map */}
            {route.route_map.origin && (
              <div className={styles.mapCard}>
                <div className={styles.mapPreview}>
                  <div
                    className={styles.mapThumbnail}
                    onClick={() => openMapModal(route.route_map.origin, `${t.departure || 'Yola Düşmə'}: ${route.route_map.origin.stop_name}`)}
                  >
                    <div className={styles.mapOverlay}>
                      <i className="fas fa-search-plus"></i>
                      <span>{t.viewOnMap || 'Xəritədə Bax'}</span>
                    </div>
                    <div className={styles.mapIcon}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className={styles.mapGradient}></div>
                  </div>
                </div>
                <div className={styles.mapInfo}>
                  <h4>{route.route_map.origin.stop_name}</h4>
                  <p>{route.route_map.origin.full_location}</p>
                  <div className={styles.mapMeta}>
                    <span className={styles.mapType}>
                      <i className="fas fa-play"></i>
                      {t.origin || 'Başlanğıc'}
                    </span>
                    <span className={styles.mapTime}>
                      <i className="fas fa-clock"></i>
                      {route.route_map.origin.departure_time}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Destination Map */}
            {route.route_map.destination && (
              <div className={styles.mapCard}>
                <div className={styles.mapPreview}>
                  <div
                    className={styles.mapThumbnail}
                    onClick={() => openMapModal(route.route_map.destination, `${t.destination || 'Təyinat'}: ${route.route_map.destination.stop_name}`)}
                  >
                    <div className={styles.mapOverlay}>
                      <i className="fas fa-search-plus"></i>
                      <span>{t.viewOnMap || 'Xəritədə Bax'}</span>
                    </div>
                    <div className={styles.mapIcon}>
                      <i className="fas fa-flag-checkered"></i>
                    </div>
                    <div className={styles.mapGradient}></div>
                  </div>
                </div>
                <div className={styles.mapInfo}>
                  <h4>{route.route_map.destination.stop_name}</h4>
                  <p>{route.route_map.destination.full_location}</p>
                  <div className={styles.mapMeta}>
                    <span className={styles.mapType}>
                      <i className="fas fa-flag"></i>
                      {t.destination || 'Təyinat'}
                    </span>
                    <span className={styles.mapTime}>
                      <i className="fas fa-clock"></i>
                      {route.route_map.destination.arrival_time}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Current Stop Map */}
            {route.route_map.current_stop && (
              <div className={styles.mapCard}>
                <div className={styles.mapPreview}>
                  <div
                    className={styles.mapThumbnail}
                    onClick={() => openMapModal(route.route_map.current_stop, `${t.current || 'Hazırda'}: ${route.route_map.current_stop.stop_name}`)}
                  >
                    <div className={styles.mapOverlay}>
                      <i className="fas fa-search-plus"></i>
                      <span>{t.viewOnMap || 'Xəritədə Bax'}</span>
                    </div>
                    <div className={styles.mapIcon}>
                      <i className="fas fa-location-dot"></i>
                    </div>
                    <div className={styles.mapGradient}></div>
                  </div>
                </div>
                <div className={styles.mapInfo}>
                  <h4>{route.route_map.current_stop.stop_name}</h4>
                  <p>{route.route_map.current_stop.full_location}</p>
                  <div className={styles.mapMeta}>
                    <span className={styles.mapTypeCurrent}>
                      <i className="fas fa-location-dot"></i>
                      {t.current || 'Hazırda'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Route Timeline */}
      <div className={styles.timeline}>
        <h3 className={styles.timelineTitle}>
          <i className="fas fa-timeline"></i>
          {t.route}
        </h3>

        <div className={styles.timelineContainer}>
          {route.stops.map((stop, index) => {
            let isCompleted, isCurrent, isUpcoming
            const tracking = car.journey_tracking || {}

            // Check journey completion first
            if (tracking.journey_completed || tracking.journey_status === 'completed') {
              // If journey is completed, all stops are completed
              isCompleted = true
              isCurrent = false
              isUpcoming = false
            } else if (stop.status) {
  const status = typeof stop.status === 'string' ? stop.status : stop.status.status
  isCompleted = status === 'completed'
  isCurrent = status === 'current' || stop.is_current
  isUpcoming = status === 'upcoming'
            } else {
              // Fallback to old logic
              if (!tracking.journey_started) {
                isCompleted = false
                isCurrent = index === 0
                isUpcoming = index > 0
              } else {
                isCompleted = completedStops > index
                isCurrent = stop.is_current
                isUpcoming = !isCompleted && !isCurrent
              }
            }

            return (
              <div
                key={stop.id}
                className={`${styles.timelineItem} ${isCompleted ? styles.completed :
                  isCurrent ? styles.current :
                    styles.upcoming
                  }`}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.timelineIcon}>
                    {isCompleted && <i className="fas fa-check"></i>}
                    {isCurrent && <i className="fas fa-location-dot"></i>}
                    {isUpcoming && <i className="fas fa-circle"></i>}
                  </div>
                  {index < route.stops.length - 1 && (
                    <div className={styles.timelineLine}></div>
                  )}
                </div>

                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h4 className={styles.stopName}>{stop.stop_name}</h4>
                    <div className={styles.timelineStatus}>
                      {isCompleted && (
                        <span className={styles.statusCompleted}>
                          {(car.journey_tracking?.journey_completed || car.journey_completed) && index === route.stops.length - 1
                            ? (t.arrived || 'Çatdı')
                            : t.completed}
                        </span>
                      )}
                      {isCurrent && (
                        <span className={styles.statusCurrent}>
                          {(!car.journey_tracking?.journey_started && !car.journey_started) ||
                            car.journey_tracking?.journey_status === 'not_started'
                            ? (t.waiting || 'Gözləyir')
                            : t.current}
                        </span>
                      )}
                      {isUpcoming && <span className={styles.statusUpcoming}>{t.upcoming}</span>}
                    </div>
                  </div>

                  <div className={styles.stopDetails}>
                    <div className={styles.stopLocation}>
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{stop.city}, {stop.country}</span>
                    </div>

                    {stop.location_details && (
                      <div className={styles.stopDescription}>
                        <i className="fas fa-info-circle"></i>
                        <span>{stop.location_details}</span>
                      </div>
                    )}

                    <div className={styles.stopTiming}>
                      <div className={styles.timingItem}>
                        <i className="fas fa-clock"></i>
                        <span>{t.departure}: {stop.departure_time}</span>
                      </div>

                      {stop.duration_minutes > 0 && (
                        <div className={styles.timingItem}>
                          <i className="fas fa-hourglass-half"></i>
                          <span>{t.duration}: {stop.duration_minutes} {t.minutes}</span>
                        </div>
                      )}

                      {stop.estimated_departure !== stop.departure_time && (
                        <div className={styles.timingItem}>
                          <i className="fas fa-plane-departure"></i>
                          <span>{t.estimatedArrival}: {stop.estimated_departure}</span>
                        </div>
                      )}

                      {(stop.travel_time_human || stop.travel_time_hours > 0) && (
                        <div className={styles.timingItem}>
                          <i className="fas fa-road"></i>
                          <span>{t.travelTime || 'Yol Müddəti'}: {stop.travel_time_human || `${stop.travel_time_hours}h`}</span>
                        </div>
                      )}

                      {stop.duration_human && (
                        <div className={styles.timingItem}>
                          <i className="fas fa-pause"></i>
                          <span>{t.stopDuration || 'Dayanma'}: {stop.duration_human}</span>
                        </div>
                      )}

                      {stop.google_maps_iframe && (
                        <div className={styles.timingItem}>
                          <button
                            className={styles.mapButton}
                            onClick={() => openMapModal(stop, stop.stop_name)}
                          >
                            <i className="fas fa-map"></i>
                            <span>{t.viewOnMap || 'Xəritədə Bax'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Map Modal */}
      {showMapModal && selectedMapData && (
        <div className={styles.mapModal} onClick={closeMapModal}>
          <div className={styles.mapModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mapModalHeader}>
              <h3>{selectedMapData.title}</h3>
              <button className={styles.closeMapModal} onClick={closeMapModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className={styles.mapModalBody}>
              {selectedMapData.google_maps_iframe ? (
                <div
                  className={styles.mapIframeContainer}
                  dangerouslySetInnerHTML={{
                    __html: selectedMapData.google_maps_iframe.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="400"')
                  }}
                />
              ) : (
                <div className={styles.mapPlaceholder}>
                  <i className="fas fa-map"></i>
                  <p>{t.mapNotAvailable || 'Xəritə mövcud deyil'}</p>
                </div>
              )}

              <div className={styles.mapModalInfo}>
                <div className={styles.mapModalLocation}>
                  <h4>{selectedMapData.stop_name}</h4>
                  <p>{selectedMapData.full_location}</p>
                  {selectedMapData.location_details && (
                    <p className={styles.mapModalDetails}>{selectedMapData.location_details}</p>
                  )}
                </div>

                {selectedMapData.coordinates && (
                  <div className={styles.mapModalCoordinates}>
                    <div className={styles.coordinateItem}>
                      <span className={styles.coordinateLabel}>{t.latitude || 'Enlik'}:</span>
                      <span className={styles.coordinateValue}>{selectedMapData.coordinates.latitude}</span>
                    </div>
                    <div className={styles.coordinateItem}>
                      <span className={styles.coordinateLabel}>{t.longitude || 'Uzunluq'}:</span>
                      <span className={styles.coordinateValue}>{selectedMapData.coordinates.longitude}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}