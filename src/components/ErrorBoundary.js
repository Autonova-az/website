'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.errorIcon}>⚠️</div>
            <h1 className={styles.title}>Bir Şey Səhv Getdi</h1>
            <p className={styles.description}>
              Üzr istəyirik, gözlənilməz bir xəta baş verdi. Səhifəni yeniləməyi cəhd edin.
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className={styles.errorDetails}>
                <summary>Texniki Məlumat (Development)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className={styles.actions}>
              <button 
                onClick={() => window.location.reload()}
                className={styles.reloadButton}
              >
                Səhifəni Yenilə
              </button>
              <Link href="/" className={styles.homeButton}>
                Ana Səhifəyə Qayıt
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

    return this.props.children;
  }
}

export default ErrorBoundary;