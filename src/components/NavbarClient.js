"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import LanguageSwitcher from "./LanguageSwitcher"; // Assuming this path is correct
import { getTranslation } from "@/locales/translations";

export default function NavbarClient({ locale, searchParams: searchParamsString }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current pathname from Next.js client-side
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
  }, [pathname]); // Close menu when route changes

  // Unified function for creating localized links (client-side for dynamic usage)
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


  return (
    <>
      <div className={`nav-actions ${isScrolled ? "scrolled" : ""}`}>
        <Link href={createLocalizedLink("/search")} className="search-btn">
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

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="nav-menu-mobile">
          <li className="nav-item">
            <Link
              href={createLocalizedLink("/")}
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
            >
              <span className="nav-text">{t("nav.home")}</span>
              <div className={`nav-indicator ${pathname === "/" ? "active" : ""}`}></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={createLocalizedLink("/automobiles")}
              className={`nav-link ${pathname.startsWith("/automobiles") ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-text">{t("nav.automobiles")}</span>
              <div className={`nav-indicator ${pathname.startsWith("/automobiles") ? "active" : ""}`}></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={createLocalizedLink("/services")}
              className={`nav-link ${pathname === "/services" ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-text">{t("nav.services")}</span>
              <div className={`nav-indicator ${pathname === "/services" ? "active" : ""}`}></div>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href={createLocalizedLink("/about")}
              className={`nav-link ${pathname === "/about" ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-text">{t("nav.about")}</span>
              <div className={`nav-indicator ${pathname === "/about" ? "active" : ""}`}></div>
            </Link>
          </li>
          <li className="nav-item">
            <a
              href="/#contact"
              className="nav-link nav-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className="fas fa-phone-alt"></i>
              <span className="nav-text">{t("nav.contact")}</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}