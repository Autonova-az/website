'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState('az')

  useEffect(() => {
    // Get saved language from localStorage or default to 'az'
    const savedLocale = localStorage.getItem('locale') || 'az'
    setLocale(savedLocale)
  }, [])

  const changeLanguage = (newLocale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}