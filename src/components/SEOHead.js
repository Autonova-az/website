import Head from 'next/head';
import { generateStructuredData } from '@/utils/seo';

export default function SEOHead({
  title,
  description,
  keywords = [],
  image = '/hero_car.jpeg',
  url = '',
  type = 'website',
  structuredData = null,
  noIndex = false,
  canonical = null
}) {
  const baseUrl = 'https://autonova.az';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${baseUrl}${image}`} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Autonova" />
      <meta property="og:locale" content="az_AZ" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />
      
      {/* Language Alternates */}
      <link rel="alternate" hrefLang="az" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={`${fullUrl}/en`} />
      <link rel="alternate" hrefLang="ru" href={`${fullUrl}/ru`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
}