import Link from 'next/link';
import styles from '../not-found.module.css';

export const metadata = {
  title: '404 - Axtarış Nəticəsi Tapılmadı | Autonova',
  description: 'Axtarış nəticəsi tapılmadı. Yeni axtarış edin və ya avtomobil kataloqunu nəzərdən keçirin.',
  robots: 'noindex, nofollow',
};

export default function SearchNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>🔍</div>
        <h1 className={styles.title}>Axtarış Nəticəsi Tapılmadı</h1>
        <p className={styles.description}>
          Axtardığınız kriterilərlə uyğun avtomobil tapılmadı. Axtarış şərtlərini dəyişdirərək yenidən cəhd edin.
        </p>
        <div className={styles.actions}>
          <Link href="/search" className={styles.homeButton}>
            Yeni Axtarış
          </Link>
          <Link href="/automobiles" className={styles.carsButton}>
            Bütün Avtomobillər
          </Link>
        </div>
        <div className={styles.suggestions}>
          <h3>Axtarış Tövsiyələri:</h3>
          <ul>
            <li><Link href="/search?type=vin">VIN Kodu ilə Axtarış</Link></li>
            <li><Link href="/automobiles?brand=popular">Populyar Markalar</Link></li>
            <li><Link href="/automobiles?price=budget">Büdcə Dostu</Link></li>
            <li><Link href="/services">Xidmətlərimiz</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}