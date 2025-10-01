'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'
import { getTranslation } from '@/locales/translations'
import Link from "next/link";

export default function Hero({ locale = 'az' }) {
  const [counters, setCounters] = useState({
    cars: 0,
    satisfaction: 0,
    experience: 0,
    brands: 0
  })

  useEffect(() => {
    const animateCounters = () => {
      const targets = { cars: 500, satisfaction: 98, experience: 5, brands: 15 }
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
    <section id="home" className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroParticles}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.heroBadge}>
            <i className="fas fa-award"></i>
            <span>{getTranslation(locale, 'hero.badge')}</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine} data-text={getTranslation(locale, 'hero.title.line1')}>{getTranslation(locale, 'hero.title.line1')}</span>
            <span className={styles.titleLine} data-text={getTranslation(locale, 'hero.title.line2')}>{getTranslation(locale, 'hero.title.line2')}</span>
            <span className={`${styles.titleLine} ${styles.highlight}`} data-text={getTranslation(locale, 'hero.title.line3')}>{getTranslation(locale, 'hero.title.line3')}</span>
          </h1>

          <p className={styles.heroDescription}>
            {getTranslation(locale, 'hero.description')}
          </p>

          <div className={styles.heroFeatures}>
            <div className={styles.featurePill}>
              <i className="fas fa-shield-check"></i>
              <span>{getTranslation(locale, 'hero.features.quality')}</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-shipping-fast"></i>
              <span>{getTranslation(locale, 'hero.features.delivery')}</span>
            </div>
            <div className={styles.featurePill}>
              <i className="fas fa-headset"></i>
              <span>{getTranslation(locale, 'hero.features.support')}</span>
            </div>
          </div>

          <div className={styles.heroButtons}>
            <Link href="/automobiles" className="btn btn-primary">
              <i className="fas fa-car"></i>
              <span>{getTranslation(locale, 'hero.buttons.explore')}</span>
              <div className="btn-shine"></div>
            </Link>
            <Link href="#contact" className="btn btn-secondary">
              <i className="fas fa-phone-alt"></i>
              <span>{getTranslation(locale, 'hero.buttons.consultation')}</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.carShowcase}>
            <div className={styles.carImage}>
              <Image
                src="/hero_car.jpeg"
                alt="Premium Car"
                width={800}
                height={600}
                priority
              />
              <div className={styles.carGlow}></div>
            </div>
            <div className={styles.floatingElements}>
              <div className={`${styles.floatingCard} ${styles.priceCard}`}>
                <i className="fas fa-tag"></i>
                <span>{getTranslation(locale, 'hero.floatingCards.price')}</span>
              </div>
              <div className={`${styles.floatingCard} ${styles.qualityCard}`}>
                <i className="fas fa-star"></i>
                <span>{getTranslation(locale, 'hero.floatingCards.quality')}</span>
              </div>
              <div className={`${styles.floatingCard} ${styles.deliveryCard}`}>
                <i className="fas fa-truck"></i>
                <span>{getTranslation(locale, 'hero.floatingCards.delivery')}</span>
              </div>
            </div>
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
              <span className={styles.statLabel}>{getTranslation(locale, 'hero.stats.cars')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-users"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.satisfaction}</span>
              <span className={styles.statPlus}>%</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'hero.stats.satisfaction')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-award"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.experience}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'hero.stats.experience')}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statIcon}>
              <i className="fas fa-globe"></i>
            </div>
            <div className={styles.statContent}>
              <span className={styles.statNumber}>{counters.brands}</span>
              <span className={styles.statPlus}>+</span>
              <span className={styles.statLabel}>{getTranslation(locale, 'hero.stats.brands')}</span>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>{getTranslation(locale, 'hero.scroll')}</div>
        <div className={styles.scrollArrow}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
    </section>
  )
}
