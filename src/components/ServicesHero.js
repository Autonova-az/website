'use client'

import { useEffect, useState } from 'react'
import styles from './ServicesHero.module.css'
import { getTranslation } from '@/locales/translations'

export default function ServicesHero({ locale = 'az' }) {
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
            <span>{getTranslation(locale, 'servicesHero.badge')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine} data-text={getTranslation(locale, 'servicesHero.title.line1')}>{getTranslation(locale, 'servicesHero.title.line1')}</span>
            <span className={styles.titleLine} data-text={getTranslation(locale, 'servicesHero.title.line2')}>{getTranslation(locale, 'servicesHero.title.line2')}</span>
            <span className={`${styles.titleLine} ${styles.highlight}`} data-text={getTranslation(locale, 'servicesHero.title.line3')}>{getTranslation(locale, 'servicesHero.title.line3')}</span>
          </h1>

          <p className={styles.heroDescription}>
            {getTranslation(locale, 'servicesHero.description')}
          </p>

          <div className={styles.heroFeatures}>
            <div className={styles.featurePill}>
              <i className="fas fa-car"></i>
              <span>{getTranslation(locale, 'servicesHero.features.sales')}</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-tools"></i>
              <span>{getTranslation(locale, 'servicesHero.features.technical')}</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-file-contract"></i>
              <span>{getTranslation(locale, 'servicesHero.features.documentation')}</span>
            </div>
          </div>

          <div className={styles.heroButtons}>
            <a href="#services" className="btn btn-primary">
              <i className="fas fa-cogs"></i>
              <span>{getTranslation(locale, 'servicesHero.buttons.viewServices')}</span>
              <div className="btn-shine"></div>
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-phone-alt"></i>
              <span>{getTranslation(locale, 'servicesHero.buttons.contact')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* <div className={styles.heroStats}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-car"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.cars}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'servicesHero.stats.cars')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-users"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.satisfaction}</span>
              <span className={styles.statPlus}>%</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'servicesHero.stats.satisfaction')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-award"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.experience}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'servicesHero.stats.experience')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-headset"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statPlus}></span>
              <span className={styles.statLabel}>{getTranslation(locale, 'servicesHero.stats.support')}</span>
            </div>
          </div>
        </div>
      </div> */}

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>{getTranslation(locale, 'servicesHero.scroll')}</div>
        <div className={styles.scrollArrow}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  )
}