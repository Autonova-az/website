import { getServerLocale } from '@/utils/locale'
import { translations } from '@/locales/translations'
import AutomobileDetailClient from './AutomobileDetailClient'
import BASE_URL from '@/utils/baseurl'

// Fetch automobile data on server side
async function fetchAutomobile(id, locale) {
  try {
    const response = await fetch(`${BASE_URL}/automobiles/${id}?locale=${locale}`, {
      cache: 'no-store' // Ensure fresh data
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (result.success && result.data) {
      return result.data
    }

    return null
  } catch (error) {
    console.error('Error fetching automobile:', error)
    return null
  }
}

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params
  const locale = await getServerLocale(searchParams)
  const t = translations[locale]

  // Fetch car data for metadata
  const carData = await fetchAutomobile(resolvedParams.id, locale)

  if (carData) {
    return {
      title: `${carData.name} - ${carData.brand?.name || ''} - Autonova`,
      description: carData.brand?.description || t.automobileDetail?.notFoundMessage || 'Avtomobilin ətraflı məlumatları və xüsusiyyətləri',
    }
  }

  return {
    title: `${t.automobileDetail?.notFound || 'Avtomobil Detalları'} - Autonova`,
    description: t.automobileDetail?.notFoundMessage || 'Avtomobilin ətraflı məlumatları və xüsusiyyətləri',
  }
}

export default async function AutomobileDetailPage({ params, searchParams }) {
  const resolvedParams = await params
  const locale = await getServerLocale(searchParams)
  const automobileData = await fetchAutomobile(resolvedParams.id, locale)



  return (
    <AutomobileDetailClient
      id={resolvedParams.id}
      locale={locale}
      initialData={null }
    />
  )
}