import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL('https://autonova.az'),
  title: {
    default: "Autonova - Premium Avtomobillər Azərbaycanda",
    template: "%s | Autonova"
  },
  description: "Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk. Yüksək standartlar və müştəri məmnuniyyəti bizim prioritetimizdir.",
  keywords: ["avtomobil", "Çin avtomobil", "idxal", "Azərbaycan", "premium cars", "autonova", "avtomobil satışı", "yeni avtomobil", "avtomobil bazarı"],
  authors: [{ name: "Autonova Team" }],
  creator: "Autonova",
  publisher: "Autonova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: 'https://autonova.az',
    siteName: 'Autonova',
    title: 'Autonova - Premium Avtomobillər Azərbaycanda',
    description: 'Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk.',
    images: [
      {
        url: '/hero_car.jpeg',
        width: 1200,
        height: 630,
        alt: 'Autonova Premium Avtomobillər',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autonova - Premium Avtomobillər',
    description: 'Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk.',
    images: ['/hero_car.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <head>
        <link rel="canonical" href="https://autonova.az" />
        <link rel="alternate" hrefLang="az" href="https://autonova.az" />
        <link rel="alternate" hrefLang="en" href="https://autonova.az/en" />
        <link rel="alternate" hrefLang="ru" href="https://autonova.az/ru" />
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Autonova",
              "url": "https://autonova.az",
              "logo": "https://autonova.az/logo.png",
              "description": "Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AZ",
                "addressLocality": "Bakı"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+994-XX-XXX-XX-XX",
                "contactType": "customer service",
                "availableLanguage": ["az", "en", "ru"]
              },
              "sameAs": [
                "https://facebook.com/autonova",
                "https://instagram.com/autonova",
                "https://linkedin.com/company/autonova"
              ]
            })
          }}
        />
        {children}
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
