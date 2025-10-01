import Footer from '@/components/Footer'
import ServicesHero from '@/components/ServicesHero'
import ServicesGrid from '@/components/ServicesGrid'
import WhyChooseUs from '@/components/WhyChooseUs'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import BASE_URL from '@/utils/baseurl'
import {getServerLocale} from '@/utils/locale'
import Navbar from "@/components/Navbar";

export const metadata = {
    title: 'Xidmətlər - Autonova',
    description: 'Autonova xidmətləri: Avtomobil satışı, texniki xidmət, sənədləşdirmə və məsləhət. Professional komandamız sizə ən yaxşı təklifi təqdim etməyə hazırdır.',
}

export default async function ServicesPage({searchParams}) {
    const locale = await getServerLocale(searchParams)
    const servicesResponse = await fetch(`${BASE_URL}/content?locale=${locale}`)
    const data = await servicesResponse.json()

    return (
        <>
            <Navbar searchParams={searchParams} locale={locale}/>
            <ServicesHero locale={locale}/>
            <ServicesGrid/>
            <WhyChooseUs data={data.data.advantages}/>
            <ProcessSection data={data.data.work_processes}/>
            <TestimonialsSection/>
            <FAQ data={data.data.faqs}/>
            <Footer searchParams={searchParams}/>
        </>
    )
}
