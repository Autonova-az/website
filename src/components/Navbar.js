import Link from "next/link"
import { headers } from "next/headers"
import { getTranslation } from "@/locales/translations"
import NavbarClient from "./NavbarClient"

// Add this line to force dynamic rendering for this component
export const dynamic = 'force-dynamic';

export default async function Navbar({ locale }) {
  const headersList = await headers()
  const pathname = headersList.get("x-current-path") || "/"
  const searchParams = new URLSearchParams(headersList.get("x-search-params") || "")

  const t = (key) => getTranslation(locale, key)

  const createLocalizedLink = (href) => {
    const params = new URLSearchParams(searchParams)
    if (locale !== "az") {
      params.set("locale", locale)
    } else {
      params.delete("locale")
    }
    const queryString = params.toString()
    return queryString ? `${href}?${queryString}` : href
  }

  const createLocalizedLink2 = (href) => {
    const params = new URLSearchParams()
    if (locale !== "az") {
      params.set("locale", locale)
    } else {
      params.delete("locale")
    }
    const queryString = params.toString()
    return queryString ? `${href}?${queryString}` : href
  }

  return (
      <nav className="navbar">
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

          <ul className="nav-menu">
            <li className="nav-item">
              <Link
                  href={createLocalizedLink2("/")}
                  className={`nav-link`}
              >
                <span className="nav-text">{t("nav.home")}</span>
                <div className={`nav-indicator ${pathname === "/" ? "active" : ""}`}></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                  href={createLocalizedLink("/automobiles")}
                  className={`nav-link `}
              >
                <span className="nav-text">{t("nav.automobiles")}</span>
                <div className={`nav-indicator ${pathname.startsWith("/automobiles") ? "active" : ""}`}></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                  href={createLocalizedLink2("/services")}
                  className={`nav-link `}
              >
                <span className="nav-text">{t("nav.services")}</span>
                <div className={`nav-indicator ${pathname === "/services"  ? "active" : ""}`}></div>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                  href={createLocalizedLink2("/about")}
                  className={`nav-link `}
              >
                <span className="nav-text">{t("nav.about")}</span>
                <div className={`nav-indicator ${pathname === "/about" ? "active" : ""}`}></div>
              </Link>
            </li>
            <li className="nav-item">
              <a href={createLocalizedLink2("/#contact")} className="nav-link nav-cta">
                <i className="fas fa-phone-alt"></i>
                <span className="nav-text">{t("nav.contact")}</span>
              </a>
            </li>
          </ul>

          {/* 👇 Client tərəf scroll + hamburger üçün */}
          <NavbarClient locale={locale}  searchParams={searchParams} />
        </div>
      </nav>
  )
}
