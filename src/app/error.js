'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIcon}>⚠️</div>
        <h1 className={styles.title}>Xəta Baş Verdi</h1>
        <p className={styles.description}>
          Üzr istəyirik, gözlənilməz bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
        </p>
        <div className={styles.errorDetails}>
          <details className={styles.details}>
            <summary>Texniki Məlumat</summary>
            <pre className={styles.errorMessage}>
              {error?.message || 'Naməlum xəta'}
            </pre>
          </details>
        </div>
        <div className={styles.actions}>
          <button 
            onClick={reset}
            className={styles.retryButton}
          >
            Yenidən Cəhd Et
          </button>
          <Link href="/" className={styles.homeButton}>
            Ana Səhifəyə Qayıt
          </Link>
        </div>
        <div className={styles.helpSection}>
          <p>Əgər problem davam edirsə, bizimlə əlaqə saxlayın:</p>
          <a href="mailto:info@autonova.az" className={styles.contactLink}>
            info@autonova.az
          </a>
        </div>
      </div>
    </div>
  );
}