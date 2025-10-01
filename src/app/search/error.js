'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../error.module.css';

export default function SearchError({ error, reset }) {
  useEffect(() => {
    console.error('Search page error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>🔍</div>
        <h1 className={styles.title}>Axtarış Xətası</h1>
        <p className={styles.description}>
          Axtarış zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
        </p>
        <div className={styles.actions}>
          <button 
            onClick={reset}
            className={styles.retryButton}
          >
            Yenidən Axtarış Et
          </button>
          <Link href="/search" className={styles.homeButton}>
            Axtarış Səhifəsi
          </Link>
        </div>
        <div className={styles.helpSection}>
          <p>Problem davam edirsə, bizimlə əlaqə saxlayın:</p>
          <a href="mailto:info@autonova.az" className={styles.contactLink}>
            info@autonova.az
          </a>
        </div>
      </div>
    </div>
  );
}