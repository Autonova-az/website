import Link from 'next/link';
import styles from '../not-found.module.css';

export const metadata = {
  title: '404 - Səhifə Tapılmadı | Autonova Haqqında',
  description: 'Axtardığınız məlumat səhifəsi mövcud deyil. Autonova haqqında digər məlumatları öyrənin.',
  robots: 'noindex, nofollow',
};

export default function AboutNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>ℹ️</div>
        <h1 className={styles.title}>Məlumat Tapılmadı</h1>
        <p className={styles.description}>
          Axtardığınız məlumat səhifəsi mövcud deyil. Autonova haqqında digər məlumatları öyrənin.
        </p>
        <div className={styles.actions}>
          <Link href="/about" className={styles.homeButton}>
            Haqqımızda
          </Link>
          <Link href="/" className={styles.carsButton}>
            Ana Səhifə
          </Link>
        </div>
        <div className={styles.suggestions}>
          <h3>Məlumat Bölmələri:</h3>
          <ul>
            <li><Link href="/about#story">Bizim Hekayə</Link></li>
            <li><Link href="/about#team">Komanda</Link></li>
            <li><Link href="/about#mission">Missiya</Link></li>
            <li><Link href="/about#contact">Əlaqə</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}