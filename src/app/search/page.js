'use client'

import {useState} from 'react'
import styles from './search.module.css'
import {useRouter} from 'next/navigation';


export default function SearchPage() {
    const [vinCode, setVinCode] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!vinCode.trim()) {
            setError('VIN kodu daxil edin')
            return
        }

        if (vinCode.length !== 17) {
            setError('VIN kodu 17 simvoldan ibarət olmalıdır')
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
                        <span>VIN Axtarış</span>
                    </div>

                    <h1 className={styles.searchTitle}>
                        <span className={styles.titleMain}>Avtomobil</span>
                        <span className={styles.titleHighlight}>Axtarışı</span>
                    </h1>

                    <p className={styles.searchDescription}>
                        VIN kodunu daxil edərək avtomobilin <strong>təfərrüatlı məlumatlarını</strong> əldə edin
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
                                    placeholder="VIN kodunu daxil edin (17 simvol)"
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
                            className={`${styles.searchButton} `}
                        >
                            <>
                                <i className="fas fa-search"></i>
                                <span>Axtarış Et</span>
                            </>
                        </button>
                    </form>

                    <div className={styles.searchInfo}>
                        <div className={styles.infoCard}>
                            <i className="fas fa-info-circle"></i>
                            <div>
                                <h4>VIN Kodu Nədir?</h4>
                                <p>17 simvoldan ibarət unikal avtomobil identifikasiya nömrəsi</p>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Harada Tapılır?</h4>
                                <p>Ön şüşənin sol alt hissəsində və ya sürücü qapısında</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
