import Link from 'next/link'
import styles from './Features.module.css'
import { getTranslation } from '@/locales/translations'

// Convert Heroicon names to FontAwesome equivalents
const convertHeroiconToFontAwesome = (heroicon) => {
  const iconMap = {
    'heroicon-o-shield-check': 'fas fa-shield-check',
    'heroicon-o-truck': 'fas fa-shipping-fast',
    'heroicon-o-phone': 'fas fa-headset',
    'heroicon-o-document-text': 'fas fa-file-contract',
    'heroicon-o-currency-dollar': 'fas fa-dollar-sign',
    'heroicon-o-wrench-screwdriver': 'fas fa-tools'
  }
  return iconMap[heroicon] || 'fas fa-star'
}

// Get appropriate action text based on route
const getActionText = (route, locale = 'az') => {
  const textMap = {
    az: {
      '/about': 'Ətraflı',
      '/services': 'Ətraflı',
      '/contact': 'Əlaqə Saxla',
      '/pricing': 'Qiymət Öyrən',
      '/after-sales': 'Xidmətlər'
    },
    ru: {
      '/about': 'Подробнее',
      '/services': 'Подробнее',
      '/contact': 'Связаться',
      '/pricing': 'Узнать Цену',
      '/after-sales': 'Услуги'
    },
    en: {
      '/about': 'Learn More',
      '/services': 'Learn More',
      '/contact': 'Contact Us',
      '/pricing': 'Get Quote',
      '/after-sales': 'Services'
    }
  }
  return textMap[locale]?.[route] || textMap.az[route] || 'Ətraflı'
}


// Fetch features data on server side
async function getFeatures(locale = 'az') {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/advantages?locale=${locale}`, {
      cache: 'no-store' // Disable caching for fresh data
    })

    if (!response.ok) {
      throw new Error('Failed to fetch features')
    }

    const data = await response.json()

    if (data.success) {
      return data.data.map((item, index) => ({
        number: String(index + 1).padStart(2, '0'),
        icon: convertHeroiconToFontAwesome(item.icon),
        title: item.title,
        description: item.description,
        link: item.route,
        linkText: getActionText(item.route, locale)
      }))
    }

    return []
  } catch (error) {
    console.error('Error fetching features:', error)
    // Return fallback data with translations if API fails
  }
}

async function Features({ locale = 'az' }) {
  const features = await getFeatures(locale)

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-star"></i>
            <span>{getTranslation(locale, 'features.sectionBadge')}</span>
          </div>
          <h2 className="section-title">{getTranslation(locale, 'features.sectionTitle')}</h2>
          <p className="section-subtitle">{getTranslation(locale, 'features.sectionSubtitle')}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureNumber}>{feature.number}</div>
              <div className={styles.featureIcon}>
                <i className={feature.icon}></i>
                <div className={styles.iconBg}></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureLink}>
                {feature.link.startsWith('#') ? (
                  <a href={feature.link}>
                    {feature.linkText} <i className="fas fa-arrow-right"></i>
                  </a>
                ) : (
                  <Link href={feature.link}>
                    {feature.linkText} <i className="fas fa-arrow-right"></i>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features