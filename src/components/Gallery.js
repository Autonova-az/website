import Link from 'next/link'
import Image from 'next/image'
import styles from './Gallery.module.css'
import { getTranslation } from '@/locales/translations'

export default function Gallery({ locale = 'az', automobilies }) {
  const getCarTypeTranslation = (type) => {
    const typeMap = {
      az: {
        'Premium Sedan': 'Premium Sedan',
        'Kompakt SUV': 'Kompakt SUV',
        'Elektrik Sedan': 'Elektrik Sedan',
        'Kompakt Hatchback': 'Kompakt Hatchback',
        'Lüks SUV': 'Lüks SUV',
        'Lüks Sedan': 'Lüks Sedan'
      },
      ru: {
        'Premium Sedan': 'Премиум Седан',
        'Kompakt SUV': 'Компактный SUV',
        'Elektrik Sedan': 'Электрический Седан',
        'Kompakt Hatchback': 'Компактный Хэтчбек',
        'Lüks SUV': 'Люкс SUV',
        'Lüks Sedan': 'Люкс Седан'
      },
      en: {
        'Premium Sedan': 'Premium Sedan',
        'Kompakt SUV': 'Compact SUV',
        'Elektrik Sedan': 'Electric Sedan',
        'Kompakt Hatchback': 'Compact Hatchback',
        'Lüks SUV': 'Luxury SUV',
        'Lüks Sedan': 'Luxury Sedan'
      }
    }
    return typeMap[locale]?.[type] || type
  }

  const getTransmissionText = (transmission) => {
    const transmissionMap = {
      az: {
        'Avtomatik': 'Avtomatik',
        'CVT': 'CVT',
        '7-DSG': '7-DSG',
        '8-AT': '8-AT',
        '9G-Tronic': '9G-Tronic'
      },
      ru: {
        'Avtomatik': 'Автомат',
        'CVT': 'CVT',
        '7-DSG': '7-DSG',
        '8-AT': '8-AT',
        '9G-Tronic': '9G-Tronic'
      },
      en: {
        'Avtomatik': 'Automatic',
        'CVT': 'CVT',
        '7-DSG': '7-DSG',
        '8-AT': '8-AT',
        '9G-Tronic': '9G-Tronic'
      }
    }
    return transmissionMap[locale]?.[transmission] || transmission
  }

  const getPersonText = () => {
    const personMap = {
      az: 'Nəfər',
      ru: 'Чел.',
      en: 'People'
    }
    return personMap[locale] || 'Nəfər'
  }

  const getBadgeClass = (type) => {
    switch (type) {
      case 'featured': return `${styles.itemBadge} ${styles.featured}`
      case 'new': return `${styles.itemBadge} ${styles.new}`
      case 'eco': return `${styles.itemBadge} ${styles.eco}`
      case 'luxury': return `${styles.itemBadge} ${styles.luxury}`
      default: return styles.itemBadge
    }
  }

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
                  <p className={styles.carType}>
                    {car.type ? getCarTypeTranslation(car.type) : ''}
                  </p>
                  <div className={styles.carPrice}>
          <span className={styles.priceLabel}>
            {getTranslation(locale, 'gallery.priceLabel')}
          </span>
                    <span className={styles.priceAmount}>{car.price || '—'}</span>
                  </div>
                  <div className={styles.galleryActions}>
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
