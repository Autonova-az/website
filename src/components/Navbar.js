'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getTranslation } from '@/locales/translations'
import { getClientLocale } from '@/utils/locale'
import LanguageSwitcher from './LanguageSwitcher'

export default function Navbar({locale, searchParams}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pathname = usePathname()


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const t = (key) => getTranslation(locale, key)

  const createLocalizedLink = (href) => {
    const params = new URLSearchParams(searchParams)
    if (locale !== 'az') {
      params.set('locale', locale)
    } else {
      params.delete('locale')
    }
    const queryString = params.toString()
    return queryString ? `${href}?${queryString}` : href
  }

  const createLocalizedLink2 = (href) => {
    const params = new URLSearchParams()
    if (locale !== 'az') {
      params.set('locale', locale)
    } else {
      params.delete('locale')
    }
    const queryString = params.toString()
    return queryString ? `${href}?${queryString}` : href
  }


  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <div className="logo-icon">
            <i className="fas fa-car"></i>
          </div>
          <div className="logo-text">
            <h2>AUTONOVA</h2>
            <span className="logo-tagline">Premium Cars</span>
          </div>
        </Link>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link href={createLocalizedLink2('/')} className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.home')}</span>
              <div className="nav-indicator"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={createLocalizedLink('/automobiles')} className={`nav-link ${pathname.startsWith('/automobiles') ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.automobiles')}</span>
              <div className="nav-indicator"></div>
            </Link>
          </li>
          {/* <li className="nav-item">
            <a href="/#brands" className="nav-link">
              <span className="nav-text">{t('nav.brands')}</span>
              <div className="nav-indicator"></div>
            </a>
          </li> */}
          <li className="nav-item">
            <Link href={createLocalizedLink2('/services')} className={`nav-link ${pathname === '/services' ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.services')}</span>
              <div className="nav-indicator"></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link href={createLocalizedLink2('/about')} className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
              <span className="nav-text">{t('nav.about')}</span>
              <div className="nav-indicator"></div>
            </Link>
          </li>
          <li className="nav-item">
            <a href={createLocalizedLink2('/#contact')} className="nav-link nav-cta">
              <i className="fas fa-phone-alt"></i>
              <span className="nav-text">{t('nav.contact')}</span>
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <Link href={createLocalizedLink2('/search')} className="search-btn">
            <i className="fas fa-search"></i>
            <span className="search-text">{t('nav.search')}</span>
          </Link>
          <LanguageSwitcher />
          <div
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  )
}
