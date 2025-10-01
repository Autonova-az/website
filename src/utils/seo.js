// SEO utility functions for Autonova

export const defaultMetadata = {
  title: {
    default: "Autonova - Premium Avtomobillər Azərbaycanda",
    template: "%s | Autonova"
  },
  description: "Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk. Yüksək standartlar və müştəri məmnuniyyəti bizim prioritetimizdir.",
  keywords: ["avtomobil", "Çin avtomobil", "idxal", "Azərbaycan", "premium cars", "autonova"],
  authors: [{ name: "Autonova Team" }],
  creator: "Autonova",
  publisher: "Autonova",
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
};

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = '/hero_car.jpeg',
  url = '',
  type = 'website',
  noIndex = false
}) {
  const baseUrl = 'https://autonova.az';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  
  return {
    title,
    description,
    keywords: [...defaultMetadata.keywords, ...keywords],
    openGraph: {
      type,
      locale: 'az_AZ',
      url: fullUrl,
      siteName: 'Autonova',
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : defaultMetadata.robots,
    alternates: {
      canonical: fullUrl,
      languages: {
        'az': fullUrl,
        'en': `${fullUrl}/en`,
        'ru': `${fullUrl}/ru`,
      },
    },
  };
}

export function generateAutomobileMetadata(automobile) {
  const title = `${automobile.brand} ${automobile.model} ${automobile.year} - Autonova`;
  const description = `${automobile.brand} ${automobile.model} ${automobile.year} avtomobili haqqında ətraflı məlumat. Qiymət: ${automobile.price}. Autonova-dan premium keyfiyyət.`;
  
  return generatePageMetadata({
    title,
    description,
    keywords: [automobile.brand, automobile.model, automobile.year, 'avtomobil satışı'],
    image: automobile.images?.[0] || '/hero_car.jpeg',
    url: `/automobiles/${automobile.id}`,
    type: 'article',
  });
}

export function generateSearchMetadata(query) {
  const title = `"${query}" üçün Axtarış Nəticələri - Autonova`;
  const description = `"${query}" axtarışı üçün uyğun avtomobillər. Autonova-da premium avtomobillər arasından seçim edin.`;
  
  return generatePageMetadata({
    title,
    description,
    keywords: [query, 'avtomobil axtarışı', 'avtomobil tapın'],
    url: `/search?q=${encodeURIComponent(query)}`,
    noIndex: true, // Search results shouldn't be indexed
  });
}

export function generateStructuredData(type, data) {
  const baseStructuredData = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case 'organization':
      return {
        ...baseStructuredData,
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
      };

    case 'automobile':
      return {
        ...baseStructuredData,
        "@type": "Car",
        "name": `${data.brand} ${data.model}`,
        "brand": {
          "@type": "Brand",
          "name": data.brand
        },
        "model": data.model,
        "vehicleModelDate": data.year,
        "offers": {
          "@type": "Offer",
          "price": data.price,
          "priceCurrency": "AZN",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Autonova"
          }
        },
        "image": data.images,
        "description": data.description,
      };

    case 'breadcrumb':
      return {
        ...baseStructuredData,
        "@type": "BreadcrumbList",
        "itemListElement": data.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };

    default:
      return baseStructuredData;
  }
}

export const seoConfig = {
  defaultTitle: "Autonova - Premium Avtomobillər Azərbaycanda",
  titleTemplate: "%s | Autonova",
  defaultDescription: "Çindən Azərbaycana ən keyfiyyətli və etibarlı avtomobillər gətiririk.",
  siteUrl: "https://autonova.az",
  defaultImage: "/hero_car.jpeg",
  twitterHandle: "@autonova",
  facebookAppId: "your-facebook-app-id",
};