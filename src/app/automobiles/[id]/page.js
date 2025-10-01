import {getServerLocale} from '@/utils/locale'
import {translations} from '@/locales/translations'
import AutomobileDetailClient from './AutomobileDetailClient'
import BASE_URL from '@/utils/baseurl'


export const dynamic = "force-dynamic";

// Fetch automobile data on server side
async function fetchAutomobile(id, locale) {
    try {
        const response = await fetch(`${BASE_URL}/view-automobiles/${id}?locale=${locale}`, {
            cache: 'no-store', // Ensure fresh data,
            next: {revalidate: 0}
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

export async function generateMetadata({params, searchParams}) {
    const resolvedParams = await params
    const locale = await getServerLocale(searchParams)
    const t = translations[locale]

    // Fetch car data for metadata
    const carData = await fetchAutomobile(resolvedParams.id, locale)

    if (carData) {
        return {
            title: `${carData.name} - ${carData.brand?.name || ''} - Autonova`,
            description: carData.brand?.description || t?.automobileDetail?.notFoundMessage || 'Avtomobilin ətraflı məlumatları və xüsusiyyətləri',
        }
    }

    return {
        title: `${t?.automobileDetail?.notFound || 'Avtomobil Detalları'} - Autonova`,
        description: t?.automobileDetail?.notFoundMessage || 'Avtomobilin ətraflı məlumatları və xüsusiyyətləri',
    }
}

export default async function AutomobileDetailPage({params, searchParams}) {
    const resolvedParams = await params
    const locale = await getServerLocale(searchParams)
    const automobileData = await fetchAutomobile(resolvedParams.id, locale)



    return (
        <AutomobileDetailClient
            id={resolvedParams.id}
            locale={locale}
            initialData={transformApiData(automobileData, locale)}
        />
    )
}


const transformApiData = (apiData, locale) => {

    const t = translations[locale] || translations.az

    return {
        id: apiData.id,
        name: apiData.name,
        brand: apiData.brand?.name || 'Unknown',
        number: apiData.number,
        location: apiData.location,
        current_location: apiData.current_location,
        departure_date: apiData.departure_date,
        expected_arrival_time: apiData.expected_arrival_time,
        route: apiData.route,
        journey_tracking: apiData.journey_tracking,
        journey_started: apiData.journey_started,
        journey_completed: apiData.journey_completed,
        journey_status: apiData.journey_status,
        year: new Date().getFullYear(), // Default to current year if not provided
        images: apiData.images?.map(img => img.url) || [],
        type: 'SUV', // Default type, could be derived from other data
        fuel: apiData.technical_specification?.fuel?.type || 'Unknown',
        transmission: 'Automatic', // Default, could be from API
        features: apiData.features?.map(f => f.name) || [],
        description: apiData.brand?.description || t.automobileDetail?.notFoundMessage || 'Avtomobilin təsviri mövcud deyil.',
        specifications: {
            engine: apiData.technical_specification?.engine_type,
            power: apiData.technical_specification?.power,
            torque: apiData.technical_specification?.torque,
            acceleration: apiData.technical_specification?.acceleration,
            topSpeed: apiData.technical_specification?.max_speed,
            range: apiData.technical_specification?.range,
            battery: apiData.technical_specification?.battery_capacity,
            charging: apiData.technical_specification?.charging_time,
            drivetrain: apiData.technical_specification?.drivetrain,
            seating: apiData.technical_specification?.seats,
            warranty: apiData.technical_specification?.warranty,
            fuelConsumption: apiData.technical_specification?.fuel?.consumption,
            dimensions: apiData.technical_specification?.dimensions
        },
        inStock: true, // Default to true, could be derived from API
        stockCount: 1, // Default value
        colors: apiData.color ? [apiData.color.name] : [t.automobileDetail?.colorSelection || 'Qara'],
        dealer: {
            name: t.automobileDetail?.dealer?.name || 'Autonova Bakı',
            phone: '+994 12 555 0123',
            address: t.automobileDetail?.dealer?.address || 'Bakı şəhəri, Nəsimi rayonu',
            email: 'info@autonova.az'
        }
    }
}
