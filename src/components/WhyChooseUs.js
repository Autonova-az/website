import Link from 'next/link'
import styles from './WhyChooseUs.module.css'

export default function WhyChooseUs({data}) {
 

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-star"></i>
            <span>Niyə Bizi Seçməlisiniz</span>
          </div>
          <h2 className="section-title">Üstünlüklərimiz</h2>
          <p className="section-subtitle">Müştərilərimizə təqdim etdiyimiz əsas üstünlüklər</p>
        </div>

        <div className={styles.featuresGrid}>
          {data.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.featureNumber}>{feature.sort_order}</div>
              <div className={styles.featureIcon}>
                <i className={feature.icon}></i>
                <div className={styles.iconBg}></div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className={styles.featureLink}>
                <Link href={feature.route || '#contact'}>
                  Ətraflı <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}