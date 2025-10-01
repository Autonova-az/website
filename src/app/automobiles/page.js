import {getServerLocale} from '@/utils/locale'
import AutomobilesClient from './AutomobilesClient'
import BASE_URL from "@/utils/baseurl";


export const dynamic = "force-dynamic";

export const metadata = {
    title: 'Avtomobil Qalereyası - Autonova',
    description: 'Çindən gətirilən keyfiyyətli avtomobillərin geniş seçimi. BYD, Geely, Chery və digər məşhur markaların ən yeni modelləri.',
}

export default async function AutomobilesPage({searchParams}) {
    const locale = await getServerLocale(searchParams);

    const features = await fetchFeatures(locale);
    const brands = await fetchBrands(locale);


    return <AutomobilesClient features={features} brands={brands} locale={locale}/>
}


const fetchBrands = async (locale) => {
    try {
        const response = await fetch(`${BASE_URL}/brands?locale=${locale}`)
        const result = await response.json()

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.error('Error fetching brands:', error)
        return []
    }
}

const fetchFeatures = async (locale) => {
    try {
        const response = await fetch(`${BASE_URL}/features?locale=${locale}`)
        const result = await response.json()

        if (result.success) {
            return result.data
        }
    } catch (error) {
        console.error('Error fetching features:', error)
        return []
    }
}


