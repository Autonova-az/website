'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getTranslation } from '@/locales/translations'

export const useLocalization = () => {
  const { locale, changeLanguage } = useLanguage()

  const t = (key) => getTranslation(locale, key)

  useEffect(() => {
    // Update document language attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  return {
    locale,
    changeLanguage,
    t
  }
}