import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './automobile-not-found.module.css';

export const metadata = {
  title: '404 - Avtomobil Tapılmadı | Autonova',
  description: 'Axtardığınız avtomobil mövcud deyil. Digər premium avtomobillərimizi kəşf edin.',
  robots: 'noindex, nofollow',
};

export default function AutomobilesNotFound() {
  return (
    <>
      <Navbar locale="az" />
      
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Ana Səhifə</Link>
          <span>/</span>
          <Link href="/automobiles">Avtomobillər</Link>
          <span>/</span>
          <span>Tapılmadı</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.iconSection}>
              <div className={styles.carIcon}>
                <i className="fas fa-car"></i>
              </div>
              <div className={styles.errorCode}>404</div>
            </div>
            
            <div className={styles.textSection}>
              <h1 className={styles.title}>Avtomobil Tapılmadı</h1>
              <p className={styles.description}>
                Axtardığınız avtomobil mövcud deyil və ya artıq satılıb. Digər premium avtomobillərimizi nəzərdən keçirin.
              </p>
            </div>

            <div className={styles.actions}>
              <Link href="/automobiles" className={styles.primaryButton}>
                <i className="fas fa-car"></i>
                Bütün Avtomobillər
              </Link>
              <Link href="/search" className={styles.secondaryButton}>
                <i className="fas fa-search"></i>
                Axtarış Et
              </Link>
            </div>

            <div className={styles.suggestions}>
              <h3>Populyar Kateqoriyalar</h3>
              <div className={styles.categoryGrid}>
                <Link href="/automobiles?category=sedan" className={styles.categoryCard}>
                  <i className="fas fa-car"></i>
                  <span>Sedan</span>
                </Link>
                <Link href="/automobiles?category=suv" className={styles.categoryCard}>
                  <i className="fas fa-truck"></i>
                  <span>SUV</span>
                </Link>
                <Link href="/automobiles?category=hatchback" className={styles.categoryCard}>
                  <i className="fas fa-car-side"></i>
                  <span>Hatchback</span>
                </Link>
                <Link href="/services" className={styles.categoryCard}>
                  <i className="fas fa-tools"></i>
                  <span>Xidmətlər</span>
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