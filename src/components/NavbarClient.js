"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTranslation } from "@/locales/translations";

export default function NavbarClient({ locale, searchParams: searchParamsString }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = (key) => getTranslation(locale, key);
  const searchParams = new URLSearchParams(searchParamsString);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to close mobile menu when path changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  // Effect to handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Unified function for creating localized links
  const createLocalizedLink = (href) => {
    const params = new URLSearchParams(searchParams);
    if (locale && locale !== "az") {
      params.set("locale", locale);
    } else {
      params.delete("locale");
    }
    const queryString = params.toString();
    return queryString ? `${href}?${queryString}` : href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className={`nav-actions ${isScrolled ? "scrolled" : ""}`}>
        <Link href={createLocalizedLink("/search")} className="search-btn">
          <i className="fas fa-search"></i>
          <span className="search-text">{t("nav.search")}</span>
        </Link>
        <LanguageSwitcher currentLocale={locale} searchParams={searchParams} />
        <button
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay active" onClick={closeMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <img src="/logo.png" alt="Autonova Logo" className="mobile-logo-image" />
                <span>AUTONOVA</span>
              </div>
              <button className="mobile-close-btn" onClick={closeMobileMenu}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="nav-menu-mobile">
              <li className="nav-item-mobile">
                <Link
                  href={createLocalizedLink("/")}
                  className={`nav-link-mobile ${pathname === "/" ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-home"></i>
                  <span className="nav-text">{t("nav.home")}</span>
                </Link>
              </li>
              <li className="nav-item-mobile">
                <Link
                  href={createLocalizedLink("/automobiles")}
                  className={`nav-link-mobile ${pathname.startsWith("/automobiles") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-car"></i>
                  <span className="nav-text">{t("nav.automobiles")}</span>
                </Link>
              </li>
              <li className="nav-item-mobile">
                <Link
                  href={createLocalizedLink("/services")}
                  className={`nav-link-mobile ${pathname === "/services" ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-tools"></i>
                  <span className="nav-text">{t("nav.services")}</span>
                </Link>
              </li>
              <li className="nav-item-mobile">
                <Link
                  href={createLocalizedLink("/about")}
                  className={`nav-link-mobile ${pathname === "/about" ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-info-circle"></i>
                  <span className="nav-text">{t("nav.about")}</span>
                </Link>
              </li>
              <li className="nav-item-mobile">
                <a
                  href="/#contact"
                  className="nav-link-mobile nav-cta-mobile"
                  onClick={closeMobileMenu}
                >
                  <i className="fas fa-phone-alt"></i>
                  <span className="nav-text">{t("nav.contact")}</span>
                </a>
              </li>
            </ul>
            <div className="mobile-menu-footer">
              <div className="mobile-language-switcher">
                <LanguageSwitcher currentLocale={locale} searchParams={searchParams} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}