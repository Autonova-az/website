import Link from 'next/link';
import styles from '../not-found.module.css';

export const metadata = {
  title: '404 - Xidmət Tapılmadı | Autonova',
  description: 'Axtardığınız xidmət mövcud deyil. Digər xidmətlərimizi kəşf edin.',
  robots: 'noindex, nofollow',
};

export default function ServicesNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>🛠️</div>
        <h1 className={styles.title}>Xidmət Tapılmadı</h1>
        <p className={styles.description}>
          Axtardığınız xidmət mövcud deyil. Digər xidmətlərimizi nəzərdən keçirin.
        </p>
        <div className={styles.actions}>
          <Link href="/services" className={styles.homeButton}>
            Bütün Xidmətlər
          </Link>
          <Link href="/automobiles" className={styles.carsButton}>
            Avtomobillər
          </Link>
        </div>
        <div className={styles.suggestions}>
          <h3>Xidmətlərimiz:</h3>
          <ul>
            <li><Link href="/services#import">İdxal Xidməti</Link></li>
            <li><Link href="/services#consultation">Məsləhət</Link></li>
            <li><Link href="/services#delivery">Çatdırılma</Link></li>
            <li><Link href="/services#warranty">Zəmanət</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}