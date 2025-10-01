import {translations} from "@/locales/translations";
import BASE_URL from "@/utils/baseurl";

export const transformApiData = (apiData, locale) => {

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


export const fetchAutomobile = async (id, locale, path) => {
    try {
        const response = await fetch(`${BASE_URL}/${path}/vin/${id}?locale=${locale}`, {
            cache: 'no-store', // Ensure fresh data,
            next: {revalidate: 0}
        })

        console.log(`${BASE_URL}/automobiles/vin/${id}?locale=${locale}`)

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
