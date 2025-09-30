import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Gallery from '@/components/Gallery'
import Brands from '@/components/Brands'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import {getServerLocale} from '@/utils/locale'
import BASE_URL from "@/utils/baseurl";

export const dynamic = "force-dynamic";


export default async function Home({searchParams}) {
    const locale = await getServerLocale(searchParams)
    const features = await getFeatures(locale)
    const brands = await getBrands(locale)
    const automobilies = await getAutomobiles(locale)
    return (
        <>
            <Hero locale={locale}/>
            <Features features={features} locale={locale}/>
            <Gallery automobilies={automobilies}  locale={locale}/>
            <Brands locale={locale} brands={brands}/>
            <Services locale={locale}/>
            <Contact locale={locale}/>
            <Footer locale={locale}/>
        </>
    )
}


async function getAutomobiles(locale) {
    try {
        const response = await fetch(`${BASE_URL}/automobiles?locale=${locale}`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            console.error(response)
            throw new Error('Failed to fetch features')
        }

        const data = await response.json()

        if (data.success) {
            return data.data;
        }

        return []
    } catch (error) {
        console.error(error)
    }
}

async function getBrands(locale = 'az') {
    try {
        const response = await fetch(`${BASE_URL}/brands?locale=${locale}`, {
            cache: 'no-store'
        })

        if (!response.ok) {
            console.error(response)
            throw new Error('Failed to fetch features')
        }

        const data = await response.json()

        if (data.success) {
            return data.data.map((item, index) => ({
                id: item.id,
                name: item.name,
                logo: item.logo,
                automobilesCount: item.automobiles_count
            }))
        }

        return []
    } catch (error) {
        console.error('Error fetching features:', error)
    }
}

async function getFeatures(locale = 'az') {
    try {
        const response = await fetch(`${BASE_URL}/advantages?locale=${locale}`, {
            cache: 'no-store' // Disable caching for fresh data
        })

        if (!response.ok) {
            console.error(response)
            throw new Error('Failed to fetch features')
        }

        const data = await response.json()

        if (data.success) {
            return data.data.map((item, index) => ({
                number: String(index + 1).padStart(2, '0'),
                icon: convertHeroiconToFontAwesome(item.icon),
                title: item.title,
                description: item.description,
                link: item.route,
                linkText: getActionText(item.route, locale)
            }))
        }

        return []
    } catch (error) {
        console.error('Error fetching features:', error)
        // Return fallback data with translations if API fails
    }
}

const convertHeroiconToFontAwesome = (heroicon) => {
    const iconMap = {
        'heroicon-o-shield-check': 'fas fa-shield-check',
        'heroicon-o-truck': 'fas fa-shipping-fast',
        'heroicon-o-phone': 'fas fa-headset',
        'heroicon-o-document-text': 'fas fa-file-contract',
        'heroicon-o-currency-dollar': 'fas fa-dollar-sign',
        'heroicon-o-wrench-screwdriver': 'fas fa-tools'
    }
    return iconMap[heroicon] || 'fas fa-star'
}
const getActionText = (route, locale = 'az') => {
    const textMap = {
        az: {
            '/about': 'Ətraflı',
            '/services': 'Ətraflı',
            '/contact': 'Əlaqə Saxla',
            '/pricing': 'Qiymət Öyrən',
            '/after-sales': 'Xidmətlər'
        },
        ru: {
            '/about': 'Подробнее',
            '/services': 'Подробнее',
            '/contact': 'Связаться',
            '/pricing': 'Узнать Цену',
            '/after-sales': 'Услуги'
        },
        en: {
            '/about': 'Learn More',
            '/services': 'Learn More',
            '/contact': 'Contact Us',
            '/pricing': 'Get Quote',
            '/after-sales': 'Services'
        }
    }
    return textMap[locale]?.[route] || textMap.az[route] || 'Ətraflı'
}
