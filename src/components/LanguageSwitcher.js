'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { setClientLocale, getClientLocale } from '../utils/locale'
import styles from './LanguageSwitcher.module.css'

const languages = [
  { code: 'az', name: 'AZ', flag: '🇦🇿' },
  { code: 'ru', name: 'RU', flag: '🇷🇺' },
  { code: 'en', name: 'EN', flag: '🇺🇸' }
]

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState('az')

  useEffect(() => {
    setCurrentLocale(getClientLocale())
  }, [searchParams])

  const currentLanguage = languages.find(lang => lang.code === currentLocale)

  const handleLanguageChange = (langCode) => {
    setClientLocale(langCode)
    setCurrentLocale(langCode)
    
    const params = new URLSearchParams(searchParams)
    
    if (langCode === 'az') {
      // Remove locale param for default language
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
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.currentLang}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.flag}>{currentLanguage?.flag}</span>
        <span className={styles.langCode}>{currentLanguage?.name}</span>
        <i className={`fas fa-chevron-down ${isOpen ? styles.rotated : ''}`}></i>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.langOption} ${currentLocale === lang.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className={styles.flag}>{lang.flag}</span>
              <span className={styles.langName}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}