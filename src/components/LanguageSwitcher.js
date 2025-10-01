'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from './LanguageSwitcher.module.css'

const languages = [
  { code: 'az', name: 'Azərbaycan', shortName: 'AZ', flag: '🇦🇿' },
  { code: 'ru', name: 'Русский', shortName: 'RU', flag: '🇷🇺' },
  { code: 'en', name: 'English', shortName: 'EN', flag: '🇺🇸' }
]

const selectedLanguage = {
  "az": "Seçilmiş dil",
  "ru": "Выбранный язык",
  "en": "Selected language"
}

export default function LanguageSwitcher({currentLocale, searchParams}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentLanguage = languages.find(lang => lang.code === currentLocale)

  const handleLanguageChange = (langCode) => {

    const params = new URLSearchParams(searchParams)

    if (langCode === 'az') {
      params.delete('locale')
    } else {
      params.set('locale', langCode)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname

    router.push(newUrl)
    setIsOpen(false)
  }

  return (
    <div className={styles.languageSwitcher} ref={dropdownRef}>
      <button
        className={styles.currentLang}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={selectedLanguage[currentLocale]}
        aria-expanded={isOpen}
      >
        <div className={styles.langDisplay}>
          <span className={styles.flag}>{currentLanguage?.flag}</span>
          <span className={styles.langCode}>{currentLanguage?.shortName}</span>
        </div>
        <i className={`fas fa-chevron-down ${styles.chevron} ${isOpen ? styles.rotated : ''}`}></i>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.dropdownHeader}>
            <i className="fas fa-globe"></i>
            <span>{selectedLanguage[currentLocale]}</span>
          </div>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.langOption} ${currentLocale === lang.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <div className={styles.langInfo}>
                <span className={styles.flag}>{lang.flag}</span>
                <div className={styles.langDetails}>
                  <span className={styles.langName}>{lang.name}</span>
                  <span className={styles.langShort}>{lang.shortName}</span>
                </div>
              </div>
              {currentLocale === lang.code && (
                <i className={`fas fa-check ${styles.checkIcon}`}></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
