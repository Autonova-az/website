'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTranslation } from '@/locales/translations'
import { getClientLocale } from '@/utils/locale'
import styles from './Footer.module.css'

export default function Footer({searchParams}) {
  const currentYear = new Date().getFullYear()
  const [locale, setLocale] = useState('az')

  useEffect(() => {
    const currentLocale = searchParams?.locale || getClientLocale()
    setLocale(currentLocale)
  }, [searchParams])

  const t = (key) => getTranslation(locale, key)

  const createLocalizedLink = (href) => {
    if (href.startsWith('#')) return href

    const params = new URLSearchParams(searchParams)
    if (locale !== 'az') {
      params.set('locale', locale)
    } else {
      params.delete('locale')
    }
    const queryString = params.toString()
    return queryString ? `${href}?${queryString}` : href
  }

  const footerSections = [
    {
      title: "AUTONOVA",
      type: "brand",
      content: t('footer.brand.description'),
      socialLinks: [
        { icon: "fab fa-facebook", href: "#" },
        { icon: "fab fa-instagram", href: "#" },
        { icon: "fab fa-linkedin", href: "#" },
        { icon: "fab fa-whatsapp", href: "#" }
      ]
    },
    {
      title: t('footer.navigation.title'),
      type: "links",
      links: [
        { text: t('footer.navigation.home'), href: "/" },
        { text: t('footer.navigation.gallery'), href: "#gallery" },
        { text: t('footer.navigation.services'), href: "/services" },
        { text: t('footer.navigation.about'), href: "/about" }
      ]
    },
    {
      title: t('footer.services.title'),
      type: "links",
      links: [
        { text: t('footer.services.carSales'), href: "/services" },
        { text: t('footer.services.technicalService'), href: "/services" },
        { text: t('footer.services.documentation'), href: "/services" },
        { text: t('footer.services.consultation'), href: "/services" }
      ]
    },
    {
      title: t('footer.contact.title'),
      type: "contact",
      contacts: [
        { icon: "fas fa-phone", text: "+994 12 345 67 89" },
        { icon: "fas fa-envelope", text: "info@autonova.az" },
        { icon: "fas fa-map-marker-alt", text: t('footer.contact.address') }
      ]
    }
  ]

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {footerSections.map((section, index) => (
            <div key={index} className={styles.footerSection}>
              {section.type === 'brand' ? (
                <>
                  <h3>{section.title}</h3>
                  <p>{section.content}</p>
                  <div className={styles.socialLinks}>
                    {section.socialLinks.map((social, socialIndex) => (
                      <a key={socialIndex} href={social.href}>
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </>
              ) : section.type === 'links' ? (
                <>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.href.startsWith('#') ? (
                          <a href={link.href}>{link.text}</a>
                        ) : (
                          <Link href={createLocalizedLink(link.href)}>{link.text}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.contacts.map((contact, contactIndex) => (
                      <li key={contactIndex}>
                        <i className={contact.icon}></i> {contact.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Autonova. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
