import Link from 'next/link'
import Image from 'next/image'
import styles from './Gallery.module.css'
import { getTranslation } from '@/locales/translations'

export default function Gallery({ locale = 'az', automobilies }) {
  return (
      <section id="gallery" className={styles.gallery}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-car"></i>
              <span>{getTranslation(locale, 'gallery.sectionBadge')}</span>
            </div>
            <h2 className="section-title">{getTranslation(locale, 'gallery.sectionTitle')}</h2>
            <p className="section-subtitle">
              {getTranslation(locale, 'gallery.sectionSubtitle')}
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {automobilies.map((car) => (
                <div key={car.id} className={styles.galleryItem}>
                  <div className={styles.galleryImage}>
                    <Image
                        src={car.first_image?.url || '/no-image.png'}
                        alt={`${car.brand?.name || ''} ${car.name}`}
                        width={500}
                        height={280}
                    />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  <div className={styles.galleryContent}>
                    <div className={styles.carBrand}>{car.brand?.name}</div>
                    <h3 className={styles.carName}>{car.name}</h3>

                    {/* 🚀 Features list from backend */}
                    {car.features?.length > 0 && (
                        <div className={styles.carFeatures}>
                          {car.features.map((feature) => (
                              <div key={feature.id} className={styles.featureChip}>
                                <i className={feature.icon}></i>
                                <span>{feature.name}</span>
                              </div>
                          ))}
                        </div>
                    )}

                    <div  className={styles.galleryActions}>
                      <Link
                          href={`/automobiles/${car.id}`}
                          className={`${styles.actionBtn} ${styles.primary}`}
                      >
                        <i className="fas fa-eye"></i>
                        {getTranslation(locale, 'gallery.viewDetails')}
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>

          <div className={styles.galleryFooter}>
            <p className={styles.galleryNote}>
              <i className="fas fa-info-circle"></i>
              {getTranslation(locale, 'gallery.note')}
            </p>
            <Link href="/automobiles" className="btn btn-primary">
              <i className="fas fa-car"></i>
              {getTranslation(locale, 'gallery.viewAll')}
            </Link>
          </div>
        </div>
      </section>
  )
}
