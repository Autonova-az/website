import Link from 'next/link'
import styles from './Features.module.css'
import {getTranslation} from '@/locales/translations'
import BASE_URL from "@/utils/baseurl";




async function Features({locale = 'az', features}) {

    return (
        <section className={styles.features}>
            <div className="container">
                <div className="section-header">
                    <div className="section-badge">
                        <i className="fas fa-star"></i>
                        <span>{getTranslation(locale, 'features.sectionBadge')}</span>
                    </div>
                    <h2 className="section-title">{getTranslation(locale, 'features.sectionTitle')}</h2>
                    <p className="section-subtitle">{getTranslation(locale, 'features.sectionSubtitle')}</p>
                </div>

                <div className={styles.featuresGrid}>
                    {features.map((feature, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.featureNumber}>{feature.number}</div>
                            <div className={styles.featureIcon}>
                                <i className={feature.icon}></i>
                                <div className={styles.iconBg}></div>
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <div className={styles.featureLink}>
                                {feature.link.startsWith('#') ? (
                                    <a href={feature.link}>
                                        {feature.linkText} <i className="fas fa-arrow-right"></i>
                                    </a>
                                ) : (
                                    <Link href={feature.link}>
                                        {feature.linkText} <i className="fas fa-arrow-right"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
