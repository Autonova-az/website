'use client'

import { useEffect, useState } from 'react'
import styles from './ServicesHero.module.css'

export default function ServicesHero() {
  const [counters, setCounters] = useState({
    cars: 0,
    satisfaction: 0,
    experience: 5
  })

  useEffect(() => {
    const animateCounters = () => {
      const targets = { cars: 500, satisfaction: 98, experience: 5 }
      const duration = 2000
      const steps = 60

      Object.keys(targets).forEach(key => {
        const target = targets[key]
        const increment = target / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            setCounters(prev => ({ ...prev, [key]: target }))
            clearInterval(timer)
          } else {
            setCounters(prev => ({ ...prev, [key]: Math.floor(current) }))
          }
        }, duration / steps)
      })
    }

    const timer = setTimeout(animateCounters, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroParticles}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.heroBadge}>
            <i className="fas fa-cogs"></i>
            <span>Professional Avtomobil Xidmətləri</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine} data-text="Avtomobil">Avtomobil</span>
            <span className={styles.titleLine} data-text="Xidmətlərində">Xidmətlərində</span>
            <span className={`${styles.titleLine} ${styles.highlight}`} data-text="Liderik">Liderik</span>
          </h1>

          <p className={styles.heroDescription}>
            Çindən avtomobil idxalından tutmuş satış sonrası xidmətlərə qədər
            <strong> tam spektrli həllər</strong> və <strong>professional dəstək</strong> təqdim edirik.
          </p>

          <div className={styles.heroFeatures}>
            <div className={styles.featurePill}>
              <i className="fas fa-car"></i>
              <span>Avtomobil Satışı</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-tools"></i>
              <span>Texniki Xidmət</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-file-contract"></i>
              <span>Sənədləşdirmə</span>
            </div>
          </div>

          <div className={styles.heroButtons}>
            <a href="#services" className="btn btn-primary">
              <i className="fas fa-cogs"></i>
              <span>Xidmətləri Görün</span>
              <div className="btn-shine"></div>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-phone-alt"></i>
              <span>Bizimlə Əlaqə</span>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.heroStats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-car"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.cars}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>Satılmış Avtomobil</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-users"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.satisfaction}</span>
              <span className={styles.statPlus}>%</span>
              <span className={styles.statLabel}>Müştəri Məmnuniyyəti</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-award"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.experience}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>İl Təcrübə</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-headset"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statPlus}></span>
              <span className={styles.statLabel}>Dəstək Xidməti</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Aşağı Keç</div>
        <div className={styles.scrollArrow}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  )
}