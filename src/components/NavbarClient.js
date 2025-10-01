"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"
import {getTranslation} from "@/locales/translations";

export default function NavbarClient({ locale , searchParams}) {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const t = (key) => getTranslation(locale, key)


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className={`nav-actions ${isScrolled ? "scrolled" : ""}`}>
            <Link href="/search" className="search-btn">
                <i className="fas fa-search"></i>
                <span className="search-text">{t("nav.search")}</span>
            </Link>
            <LanguageSwitcher currentLocale={locale} searchParams={searchParams} />
            <div
                className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
