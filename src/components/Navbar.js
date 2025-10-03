import Link from "next/link";
import { headers } from "next/headers";
import { getTranslation } from "@/locales/translations";
import NavbarClient from "./NavbarClient"; // Assuming this path is correct

export const dynamic = 'force-dynamic';

export default async function Navbar({ locale }) {
  const headersList = headers();
  const currentPathname = headersList.get("x-current-path") || "/";
  const searchParams = new URLSearchParams(headersList.get("x-search-params") || "");

  const t = (key) => getTranslation(locale, key);

  // Unified function for creating localized links
  const createLocalizedLink = (href) => {
    const params = new URLSearchParams(searchParams);
    if (locale && locale !== "az") { // Only add locale param if it's not the default 'az'
      params.set("locale", locale);
    } else {
      params.delete("locale"); // Remove locale param if it's 'az' or null/undefined
    }
    const queryString = params.toString();
    return queryString ? `${href}?${queryString}` : href;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href={createLocalizedLink("/")} className="nav-logo">
          <div className="logo-icon">
            <img src="/logo.png" alt="Autonova Logo" className="logo-image" />
          </div>
          {/* <div className="logo-text">
            <h2>AUTONOVA</h2>
            <span className="logo-tagline">Premium Cars</span>
          </div> */}
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link href={createLocalizedLink("/")} className="nav-link">
              <span className="nav-text">{t("nav.home")}</span>
              {/* Active indicator is now handled dynamically on the client for better UX */}
              {/* <div className={`nav-indicator ${currentPathname === "/" ? "active" : ""}`}></div> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link href={createLocalizedLink("/automobiles")} className="nav-link">
              <span className="nav-text">{t("nav.automobiles")}</span>
              {/* <div className={`nav-indicator ${currentPathname.startsWith("/automobiles") ? "active" : ""}`}></div> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link href={createLocalizedLink("/services")} className="nav-link">
              <span className="nav-text">{t("nav.services")}</span>
              {/* <div className={`nav-indicator ${currentPathname === "/services" ? "active" : ""}`}></div> */}
            </Link>
          </li>
          <li className="nav-item">
            <Link href={createLocalizedLink("/about")} className="nav-link">
              <span className="nav-text">{t("nav.about")}</span>
              {/* <div className={`nav-indicator ${currentPathname === "/about" ? "active" : ""}`}></div> */}
            </Link>
          </li>
          <li className="nav-item">
            {/* The contact link is an anchor to a section, so it doesn't need locale in the same way */}
            <a href="/#contact" className="nav-link nav-cta">
              <i className="fas fa-phone-alt"></i>
              <span className="nav-text">{t("nav.contact")}</span>
            </a>
          </li>
        </ul>

        {/* Client-side components for scroll, hamburger, search, and language */}
        <NavbarClient locale={locale} searchParams={searchParams.toString()} />
      </div>
    </nav>
  );
}