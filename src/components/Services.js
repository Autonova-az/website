import Link from 'next/link'
import styles from './Services.module.css'
import { getTranslation } from '@/locales/translations'

export default function Services({ locale = 'az' }) {
  const services = [
    {
      icon: "fas fa-car",
      title: getTranslation(locale, 'services.items.sales.title'),
      description: getTranslation(locale, 'services.items.sales.description'),
      highlights: getTranslation(locale, 'services.items.sales.highlights'),
      metric: { value: "500+", label: getTranslation(locale, 'services.items.sales.metric') },
      badge: getTranslation(locale, 'services.items.sales.badge'),
      badgeType: "primary"
    },
    {
      icon: "fas fa-tools", 
      title: getTranslation(locale, 'services.items.technical.title'),
      description: getTranslation(locale, 'services.items.technical.description'),
      highlights: getTranslation(locale, 'services.items.technical.highlights'),
      metric: { value: "24/7", label: getTranslation(locale, 'services.items.technical.metric') },
      badge: getTranslation(locale, 'services.items.technical.badge'),
      badgeType: "support"
    },
    {
      icon: "fas fa-file-contract",
      title: getTranslation(locale, 'services.items.documentation.title'),
      description: getTranslation(locale, 'services.items.documentation.description'),
      highlights: getTranslation(locale, 'services.items.documentation.highlights'),
      metric: { value: "3-7", label: getTranslation(locale, 'services.items.documentation.metric') },
      badge: getTranslation(locale, 'services.items.documentation.badge'),
      badgeType: "legal"
    },
    {
      icon: "fas fa-user-tie",
      title: getTranslation(locale, 'services.items.consultation.title'),
      description: getTranslation(locale, 'services.items.consultation.description'),
      highlights: getTranslation(locale, 'services.items.consultation.highlights'),
      metric: { value: "30dəq", label: getTranslation(locale, 'services.items.consultation.metric') },
      badge: getTranslation(locale, 'services.items.consultation.badge'),
      badgeType: "free"
    }
  ]

  const getBadgeClass = (type) => {
    switch(type) {
      case 'primary': return styles.serviceBadge
      case 'support': return `${styles.serviceBadge} ${styles.support}`
      case 'legal': return `${styles.serviceBadge} ${styles.legal}`
      case 'free': return `${styles.serviceBadge} ${styles.free}`
      default: return styles.serviceBadge
    }
  }

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-cogs"></i>
            <span>{getTranslation(locale, 'services.sectionBadge')}</span>
          </div>
          <h2 className="section-title">{getTranslation(locale, 'services.sectionTitle')}</h2>
          <p className="section-subtitle">
            {getTranslation(locale, 'services.sectionSubtitle')}
          </p>
        </div>

        <div className={styles.servicesShowcase}>
          <div className={styles.servicesIntro}>
            <div className={styles.introContent}>
              <h3>{getTranslation(locale, 'services.intro.title')}</h3>
              <p>
                {getTranslation(locale, 'services.intro.description')}
              </p>
              <div className={styles.introHighlights}>
                <div className={styles.highlightItem}>
                  <i className="fas fa-check-circle"></i>
                  <span>{getTranslation(locale, 'services.intro.highlights.experience')}</span>
                </div>
                <div className={styles.highlightItem}>
                  <i className="fas fa-check-circle"></i>
                  <span>{getTranslation(locale, 'services.intro.highlights.customers')}</span>
                </div>
                <div className={styles.highlightItem}>
                  <i className="fas fa-check-circle"></i>
                  <span>{getTranslation(locale, 'services.intro.highlights.support')}</span>
                </div>
              </div>
            </div>
            <div className={styles.introVisual}>
              <div className={styles.visualGrid}>
                <div className={styles.visualItem}>
                  <div className={styles.visualIcon}>
                    <i className="fas fa-car"></i>
                  </div>
                  <span>{getTranslation(locale, 'services.items.sales.title')}</span>
                </div>
                <div className={styles.visualItem}>
                  <div className={styles.visualIcon}>
                    <i className="fas fa-tools"></i>
                  </div>
                  <span>{getTranslation(locale, 'services.items.technical.title')}</span>
                </div>
                <div className={styles.visualItem}>
                  <div className={styles.visualIcon}>
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <span>{getTranslation(locale, 'services.items.documentation.title')}</span>
                </div>
                <div className={styles.visualItem}>
                  <div className={styles.visualIcon}>
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <span>{getTranslation(locale, 'services.items.consultation.title')}</span>
                </div>
              </div>
              <div className={styles.visualDecoration}>
                <div className={styles.decorationCircle}></div>
                <div className={styles.decorationDots}></div>
              </div>
            </div>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <div key={index} className={`${styles.serviceCard} ${index === 0 ? styles.primary : ''}`}>
                <div className={styles.serviceTop}>
                  <div className={styles.serviceIcon}>
                    <i className={service.icon}></i>
                  </div>
                  <div className={getBadgeClass(service.badgeType)}>{service.badge}</div>
                </div>
                <div className={styles.serviceBody}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className={styles.serviceHighlights}>
                    {service.highlights.map((highlight, highlightIndex) => (
                      <span key={highlightIndex} className={styles.highlight}>{highlight}</span>
                    ))}
                  </div>
                </div>
                <div className={styles.serviceFooter}>
                  <div className={styles.serviceMetric}>
                    <span className={styles.metricValue}>{service.metric.value}</span>
                    <span className={styles.metricLabel}>{service.metric.label}</span>
                  </div>
                  <Link href="/services" className={styles.serviceLink}>
                    <span>{getTranslation(locale, 'services.detailsLink')}</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.servicesCta}>
            <div className={styles.ctaContent}>
              <h3>{getTranslation(locale, 'services.cta.title')}</h3>
              <p>{getTranslation(locale, 'services.cta.description')}</p>
            </div>
            <div className={styles.ctaActions}>
              <a href="#contact" className="btn btn-primary">
                <i className="fas fa-phone"></i>
                <span>{getTranslation(locale, 'services.cta.contactButton')}</span>
              </a>
              <Link href="/services" className="btn btn-secondary">
                <i className="fas fa-info-circle"></i>
                <span>{getTranslation(locale, 'services.cta.infoButton')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}