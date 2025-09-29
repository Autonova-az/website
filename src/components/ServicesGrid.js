import Link from 'next/link'
import styles from './ServicesGrid.module.css'

export default function ServicesGrid() {
  const services = [
    {
      icon: "fas fa-car",
      title: "Avtomobil Satışı",
      description: "Çindən gətirilən keyfiyyətli avtomobillərin professional seçimi və çatdırılması",
      highlights: ["Professional seçim", "Keyfiyyət yoxlaması", "Təhlükəsiz çatdırılma"],
      metric: { value: "500+", label: "Satılmış" },
      badge: "Əsas Xidmət",
      badgeType: "primary"
    },
    {
      icon: "fas fa-tools", 
      title: "Texniki Xidmət",
      description: "Avtomobilinizin uzunömürlü işləməsi üçün professional texniki dəstək",
      highlights: ["Diaqnostika", "Təmir işləri", "Ehtiyat hissələri"],
      metric: { value: "24/7", label: "Dəstək" },
      badge: "Satış Sonrası",
      badgeType: "support"
    },
    {
      icon: "fas fa-file-contract",
      title: "Sənədləşdirmə", 
      description: "Avtomobilin qeydiyyatı və bütün qanuni prosedurların həyata keçirilməsi",
      highlights: ["Gömrük proseduru", "Qeydiyyat", "Sığorta"],
      metric: { value: "3-7", label: "Gün" },
      badge: "Qanuni",
      badgeType: "legal"
    },
    {
      icon: "fas fa-user-tie",
      title: "Məsləhət Xidməti",
      description: "Avtomobil seçimində professional məsləhət və maliyyə planlaması",
      highlights: ["Model seçimi", "Qiymət müqayisəsi", "Maliyyə məsləhəti"],
      metric: { value: "30dəq", label: "Cavab" },
      badge: "Pulsuz",
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
            <span>Tam Spektrli Həllər</span>
          </div>
          <h2 className="section-title">Xidmətlərimiz</h2>
          <p className="section-subtitle">
            Avtomobil alışından satış sonrası xidmətlərə qədər bütün ehtiyaclarınızı qarşılayırıq
          </p>
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
                <a href="#contact" className={styles.serviceLink}>
                  <span>Ətraflı</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.servicesCta}>
          <div className={styles.ctaContent}>
            <h3>Xidmətlərimizdən Yararlanmağa Hazırsınız?</h3>
            <p>Bizimlə əlaqə saxlayın və ən yaxşı təklifi əldə edin</p>
          </div>
          <div className={styles.ctaActions}>
            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-phone"></i>
              <span>İndi Əlaqə Saxla</span>
            </a>
            <Link href="/automobiles" className="btn btn-secondary">
              <i className="fas fa-car"></i>
              <span>Avtomobilləri Görün</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}