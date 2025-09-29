import Link from 'next/link'
import styles from './ServicesCTA.module.css'

export default function ServicesCTA() {
  return (
    <section className={styles.servicesCta}>
      <div className="container">
        <div className={styles.ctaWrapper}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaHeader}>
              <div className={styles.ctaBadge}>
                <i className="fas fa-rocket"></i>
                <span>Hazırsınız?</span>
              </div>
              <h2>Xidmətlərimizdən Yararlanmağa Başlayın</h2>
              <p>Professional komandamız sizə ən yaxşı təklifi təqdim etməyə hazırdır</p>
            </div>

            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <i className="fas fa-clock"></i>
                <span>24 saat ərzində cavab</span>
              </div>
              <div className={styles.ctaFeature}>
                <i className="fas fa-shield-check"></i>
                <span>Pulsuz məsləhət</span>
              </div>
              <div className={styles.ctaFeature}>
                <i className="fas fa-handshake"></i>
                <span>Şəxsi yanaşma</span>
              </div>
            </div>
          </div>

          <div className={styles.ctaActions}>
            <div className={styles.actionCards}>
              <div className={`${styles.actionCard} ${styles.primary}`}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4>Dərhal Əlaqə</h4>
                  <p>İndi zəng edin və məsləhət alın</p>
                  <a href="tel:+994123456789" className={styles.cardBtn}>
                    <span>+994 12 345 67 89</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div className={`${styles.actionCard} ${styles.secondary}`}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4>Mesaj Göndər</h4>
                  <p>Formu doldurun, biz sizinlə əlaqə saxlayaq</p>
                  <Link href="/#contact" className={styles.cardBtn}>
                    <span>Əlaqə Formu</span>
                    <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>

              <div className={`${styles.actionCard} ${styles.tertiary}`}>
                <div className={styles.cardIcon}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className={styles.cardContent}>
                  <h4>Ofisə Gəlin</h4>
                  <p>Bakı şəhəri, Azadlıq prospekti 123</p>
                  <a href="#" className={styles.cardBtn}>
                    <span>Ünvan Bax</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}