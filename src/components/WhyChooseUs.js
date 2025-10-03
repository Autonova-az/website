import Link from 'next/link'
import styles from './WhyChooseUs.module.css'
import { convertHeroiconToFontAwesome } from '@/utils/iconConverter'

export default function WhyChooseUs({data}) {
  // Debug logging
  console.log('WhyChooseUs data:', data);
  
  if (!data || data.length === 0) {
    return (
      <section className={styles.features}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-star"></i>
              <span>Niyə Bizi Seçməlisiniz</span>
            </div>
            <h2 className="section-title">Üstünlüklərimiz</h2>
            <p className="section-subtitle">Məlumatlar yüklənir...</p>
          </div>
        </div>
      </section>
    );
  }

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
          {data.map((feature) => {
            const convertedIcon = convertHeroiconToFontAwesome(feature.icon);
            console.log(`Converting icon: ${feature.icon} -> ${convertedIcon}`);
            
            return (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureNumber}>{feature.formatted_step_number || feature.sort_order}</div>
                <div className={styles.featureIcon}>
                  <i className={convertedIcon}></i>
                  <div className={styles.iconBg}></div>
                </div>
                <h3>{feature.title || 'Başlıq yoxdur'}</h3>
                <p>{feature.description || 'Təsvir yoxdur'}</p>
                {feature.route && (
                  <div className={styles.featureLink}>
                    <Link href={feature.route}>
                      Ətraflı <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
