import BASE_URL from "@/utils/baseurl";
import {getServerLocale} from "@/utils/locale";
import {translations} from "@/locales/translations";
import AutomobileDetailClient from "@/app/automobiles/[id]/AutomobileDetailClient";
import Navbar from "@/components/Navbar";
import {fetchAutomobile, transformApiData} from "@/utils/automobilutils";
import { notFound } from 'next/navigation';


export const dynamic = "force-dynamic";


export async function generateMetadata({params, searchParams}) {
    const resolvedParams = await params
    const locale = await getServerLocale(searchParams)
    const t = translations[locale]

    // Fetch car data for metadata
    const carData = await fetchAutomobile(resolvedParams.vin, locale,"automobiles/vin")

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
    const automobileData = await fetchAutomobile(resolvedParams.vin, locale, "automobiles/vin")

    // If no automobile data found, trigger 404
    if (!automobileData) {
        notFound()
    }

    return (
        <>
            <Navbar locale={locale}/>
            <AutomobileDetailClient
                id={automobileData.id}
                locale={locale}
                initialData={transformApiData(automobileData, locale)}
            />
        </>
    )
}



