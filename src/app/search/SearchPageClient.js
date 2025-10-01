'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {getTranslation} from '@/locales/translations'
import styles from './search.module.css'

export default function SearchPageClient({locale}) {
    const [vinCode, setVinCode] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const t = (key) => getTranslation(locale, key)

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!vinCode.trim()) {
            setError(t('searchPage.errors.required'))
            return
        }

        if (vinCode.length !== 17) {
            setError(t('searchPage.errors.invalidLength'))
            return
        }

        setError('')

        router.push(`/search/${vinCode}`)
    }

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
        if (value.length <= 17) {
            setVinCode(value)
            setError('')
        }
    }

    return (
        <div className={styles.searchPage}>
            <div className={styles.searchBackground}>
                <div className={styles.backgroundOverlay}></div>
                <div className={styles.backgroundParticles}></div>
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.searchHeader}>
                    <div className={styles.searchBadge}>
                        <i className="fas fa-search"></i>
                        <span>{t('searchPage.subtitle')}</span>
                    </div>

                    <h1 className={styles.searchTitle}>
                        <span className={styles.titleMain}>{t('searchPage.title').split(' ')[0] || 'Car'}</span>
                        <span className={styles.titleHighlight}>{t('searchPage.title').split(' ')[1] || 'Search'}</span>
                    </h1>

                    <p className={styles.searchDescription}>
                        {t('searchPage.description')}
                    </p>
                </div>

                <div className={styles.searchForm}>
                    <form onSubmit={handleSearch} className={styles.vinForm}>
                        <div className={styles.inputGroup}>
                            <div className={styles.inputWrapper}>
                                <i className="fas fa-barcode"></i>
                                <input
                                    type="text"
                                    value={vinCode}
                                    onChange={handleInputChange}
                                    placeholder={t('searchPage.vinPlaceholder')}
                                    className={`${styles.vinInput} ${error ? styles.inputError : ''}`}
                                    maxLength={17}
                                />
                                <div className={styles.inputCounter}>
                                    {vinCode.length}/17
                                </div>
                            </div>

                            {error && (
                                <div className={styles.errorMessage}>
                                    <i className="fas fa-exclamation-triangle"></i>
                                    {error}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className={styles.searchButton}
                        >
                            <i className="fas fa-search"></i>
                            <span>{t('searchPage.searchButton')}</span>
                        </button>
                    </form>

                    <div className={styles.searchInfo}>
                        <div className={styles.infoCard}>
                            <i className="fas fa-info-circle"></i>
                            <div>
                                <h4>{t('searchPage.info.whatIsVin.title')}</h4>
                                <p>{t('searchPage.info.whatIsVin.description')}</p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>{t('searchPage.info.whereToFind.title')}</h4>
                                <p>{t('searchPage.info.whereToFind.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
