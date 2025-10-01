import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './vin-not-found.module.css';

export const metadata = {
  title: '404 - VIN Tapılmadı | Autonova',
  description: 'Axtardığınız VIN kodu ilə avtomobil tapılmadı. Yeni axtarış edin və ya avtomobil kataloqunu nəzərdən keçirin.',
  robots: 'noindex, nofollow',
};

export default function VinNotFound() {
  return (
    <>
      <Navbar locale="az" />
      
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/">Ana Səhifə</Link>
          <span>/</span>
          <Link href="/search">Axtarış</Link>
          <span>/</span>
          <span>VIN Tapılmadı</span>
        </div>
      </div>

      <div className={styles.container}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.iconSection}>
              <div className={styles.searchIcon}>
                <i className="fas fa-search"></i>
              </div>
              <div className={styles.errorCode}>404</div>
            </div>
            
            <div className={styles.textSection}>
              <h1 className={styles.title}>VIN Kodu Tapılmadı</h1>
              <p className={styles.description}>
                Axtardığınız VIN kodu ilə avtomobil tapılmadı. VIN kodunu yoxlayın və ya digər axtarış üsullarından istifadə edin.
              </p>
            </div>

            <div className={styles.vinInfo}>
              <div className={styles.vinTip}>
                <i className="fas fa-info-circle"></i>
                <div>
                  <h4>VIN Kodu haqqında</h4>
                  <p>VIN kodu 17 simvoldan ibarət unikal identifikatordur. Adətən avtomobilin şüşəsində və ya qapısında yerləşir.</p>
                </div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href="/search" className={styles.primaryButton}>
                <i className="fas fa-search"></i>
                Yeni Axtarış
              </Link>
              <Link href="/automobiles" className={styles.secondaryButton}>
                <i className="fas fa-car"></i>
                Bütün Avtomobillər
              </Link>
            </div>

            <div className={styles.suggestions}>
              <h3>Axtarış Tövsiyələri</h3>
              <div className={styles.tipGrid}>
                <div className={styles.tipCard}>
                  <i className="fas fa-barcode"></i>
                  <h4>VIN Kodu</h4>
                  <p>17 rəqəmli VIN kodunu dəqiq daxil edin</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="fas fa-tags"></i>
                  <h4>Marka və Model</h4>
                  <p>Avtomobilin markası və modelinə görə axtarış edin</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="fas fa-calendar"></i>
                  <h4>İl və Qiymət</h4>
                  <p>İstehsal ili və qiymət aralığına görə filtrləyin</p>
                </div>
                <div className={styles.tipCard}>
                  <i className="fas fa-phone"></i>
                  <h4>Əlaqə</h4>
                  <p>Kömək üçün bizimlə əlaqə saxlayın</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer locale="az" />
    </>
  );
}