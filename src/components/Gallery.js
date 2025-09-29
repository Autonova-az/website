import Link from 'next/link'
import Image from 'next/image'
import styles from './Gallery.module.css'
import { getTranslation } from '@/locales/translations'

export default function Gallery({ locale = 'az' }) {
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

  const cars = [
    {
      id: 1,
      brand: "Toyota",
      name: "Camry 2024",
      type: getCarTypeTranslation("Premium Sedan"),
      price: "$35,000",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
      category: "sedan",
      badge: getTranslation(locale, 'gallery.badges.featured'),
      badgeType: "featured",
      specs: [
        { icon: "fas fa-gas-pump", text: "2.5L" },
        { icon: "fas fa-cog", text: getTransmissionText("Avtomatik") },
        { icon: "fas fa-users", text: `5 ${getPersonText()}` }
      ]
    },
    {
      id: 2,
      brand: "Honda",
      name: "CR-V 2024",
      type: getCarTypeTranslation("Kompakt SUV"),
      price: "$42,000",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500",
      category: "suv",
      badge: getTranslation(locale, 'gallery.badges.new'),
      badgeType: "new",
      specs: [
        { icon: "fas fa-gas-pump", text: "1.5L Turbo" },
        { icon: "fas fa-cog", text: getTransmissionText("CVT") },
        { icon: "fas fa-users", text: `7 ${getPersonText()}` }
      ]
    },
    {
      id: 3,
      brand: "Tesla",
      name: "Model 3",
      type: getCarTypeTranslation("Elektrik Sedan"),
      price: "$45,000",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500",
      category: "electric",
      badge: getTranslation(locale, 'gallery.badges.eco'),
      badgeType: "eco",
      specs: [
        { icon: "fas fa-bolt", text: "400km" },
        { icon: "fas fa-tachometer-alt", text: "0-100: 5.6s" },
        { icon: "fas fa-users", text: `5 ${getPersonText()}` }
      ]
    },
    {
      id: 4,
      brand: "Volkswagen",
      name: "Golf GTI",
      type: getCarTypeTranslation("Kompakt Hatchback"),
      price: "$28,000",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500",
      category: "hatchback",
      specs: [
        { icon: "fas fa-gas-pump", text: "2.0L TSI" },
        { icon: "fas fa-cog", text: getTransmissionText("7-DSG") },
        { icon: "fas fa-users", text: `5 ${getPersonText()}` }
      ]
    },
    {
      id: 5,
      brand: "BMW",
      name: "X5 xDrive40i",
      type: getCarTypeTranslation("Lüks SUV"),
      price: "$65,000",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
      category: "suv",
      badge: getTranslation(locale, 'gallery.badges.luxury'),
      badgeType: "luxury",
      specs: [
        { icon: "fas fa-gas-pump", text: "3.0L" },
        { icon: "fas fa-cog", text: getTransmissionText("8-AT") },
        { icon: "fas fa-users", text: `7 ${getPersonText()}` }
      ]
    },
    {
      id: 6,
      brand: "Mercedes-Benz",
      name: "E-Class",
      type: getCarTypeTranslation("Lüks Sedan"),
      price: "$58,000",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500",
      category: "sedan",
      badge: getTranslation(locale, 'gallery.badges.luxury'),
      badgeType: "luxury",
      specs: [
        { icon: "fas fa-gas-pump", text: "2.0L" },
        { icon: "fas fa-cog", text: getTransmissionText("9G-Tronic") },
        { icon: "fas fa-users", text: `5 ${getPersonText()}` }
      ]
    }
  ]

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
          {cars.map((car) => (
            <div key={car.id} className={`${styles.galleryItem} ${car.badgeType === 'featured' ? styles.featured : ''}`}>
              {car.badge && (
                <div className={getBadgeClass(car.badgeType)}>{car.badge}</div>
              )}
              <div className={styles.galleryImage}>
                <Image
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  width={500}
                  height={280}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.galleryContent}>
                <div className={styles.carBrand}>{car.brand}</div>
                <h3 className={styles.carName}>{car.name}</h3>
                <p className={styles.carType}>{car.type}</p>
                <div className={styles.carSpecs}>
                  {car.specs.map((spec, index) => (
                    <span key={index} className={styles.spec}>
                      <i className={spec.icon}></i> {spec.text}
                    </span>
                  ))}
                </div>
                <div className={styles.carPrice}>
                  <span className={styles.priceLabel}>{getTranslation(locale, 'gallery.priceLabel')}</span>
                  <span className={styles.priceAmount}>{car.price}</span>
                </div>
                <div className={styles.galleryActions}>
                  <Link href={`/automobiles/${car.id}`} className={`${styles.actionBtn} ${styles.primary}`}>
                    <i className="fas fa-eye"></i>
                    {getTranslation(locale, 'gallery.viewDetails')}
                  </Link>
                  <button className={`${styles.actionBtn} ${styles.secondary}`}>
                    <i className="fas fa-heart"></i>
                  </button>
                  <button className={`${styles.actionBtn} ${styles.secondary}`}>
                    <i className="fas fa-share"></i>
                  </button>
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