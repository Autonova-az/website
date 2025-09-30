import Link from 'next/link'
import Image from 'next/image'
import styles from './Brands.module.css'
import { getTranslation } from '@/locales/translations'
import BASE_URL from '@/utils/baseurl'

// Fetch features data on server side


export default async function Brands({ locale = 'az' , brands}) {

  const stats = [
    { number: "15+", label: getTranslation(locale, 'brands.stats.brands') },
    { number: "50+", label: getTranslation(locale, 'brands.stats.models') },
    { number: "98%", label: getTranslation(locale, 'brands.stats.quality') },
    { number: "100%", label: getTranslation(locale, 'brands.stats.warranty') }
  ]

  return (
    <section id="brands" className={styles.brands}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-handshake"></i>
            <span>{getTranslation(locale, 'brands.sectionBadge')}</span>
          </div>
          <h2 className="section-title">{getTranslation(locale, 'brands.sectionTitle')}</h2>
          <p className="section-subtitle">{getTranslation(locale, 'brands.sectionSubtitle')}</p>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              {/* <div className={styles.statNumber}>{stat.number}</div> */}
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Brands Grid */}
        <div className={styles.brandsGrid}>
          {brands.map((brand, index) => (
            <div key={index} className={styles.brandCard}>
              <div className={styles.brandLogo}>
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  width={120}
                  height={60}
                />
              </div>
              <div className={styles.brandInfo}>
                <h3 className={styles.brandName}>{brand.name}</h3>
                <p className={styles.brandModels}>{brand.automobilesCount}+ {getTranslation(locale, 'brands.modelText')}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={styles.ctaSection}>
          <h3>{getTranslation(locale, 'brands.cta.title')}</h3>
          <Link href="/automobiles" className="btn btn-primary">
            <i className="fas fa-car"></i>
            <span>{getTranslation(locale, 'brands.cta.button')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
