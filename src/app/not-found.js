import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './not-found.module.css';

export const metadata = {
  title: '404 - Səhifə Tapılmadı | Autonova',
  description: 'Axtardığınız səhifə mövcud deyil. Autonova-nın əsas səhifəsinə qayıdın və premium avtomobillərimizi kəşf edin.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return (
    <>
      <Navbar locale="az" />
      
      <div className={styles.container}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.iconSection}>
              <div className={styles.logoIcon}>
                <i className="fas fa-car"></i>
              </div>
              <div className={styles.errorCode}>404</div>
            </div>
            
            <div className={styles.textSection}>
              <h1 className={styles.title}>Səhifə Tapılmadı</h1>
              <p className={styles.description}>
                Üzr istəyirik, axtardığınız səhifə mövcud deyil və ya köçürülüb. Ana səhifəyə qayıdın və ya aşağıdakı linklərə baxın.
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/" className={styles.primaryButton}>
                <i className="fas fa-home"></i>
                Ana Səhifəyə Qayıt
              </Link>
              <Link href="/automobiles" className={styles.secondaryButton}>
                <i className="fas fa-car"></i>
                Avtomobilləri Gör
              </Link>
            </div>

            <div className={styles.suggestions}>
              <h3>Populyar Səhifələr</h3>
              <div className={styles.linkGrid}>
                <Link href="/automobiles" className={styles.linkCard}>
                  <i className="fas fa-car"></i>
                  <div>
                    <h4>Avtomobillər</h4>
                    <p>Premium avtomobil kolleksiyamızı kəşf edin</p>
                  </div>
                </Link>
                <Link href="/services" className={styles.linkCard}>
                  <i className="fas fa-tools"></i>
                  <div>
                    <h4>Xidmətlər</h4>
                    <p>Təklif etdiyimiz xidmətlər haqqında məlumat</p>
                  </div>
                </Link>
                <Link href="/about" className={styles.linkCard}>
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <h4>Haqqımızda</h4>
                    <p>Autonova şirkəti və missiyamız</p>
                  </div>
                </Link>
                <Link href="/search" className={styles.linkCard}>
                  <i className="fas fa-search"></i>
                  <div>
                    <h4>Axtarış</h4>
                    <p>VIN kodu və ya digər parametrlərlə axtarış</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer locale="az" />
    </>
  );
}