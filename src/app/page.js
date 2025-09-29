import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Gallery from '@/components/Gallery'
import Brands from '@/components/Brands'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getServerLocale } from '@/utils/locale'

export default async function Home({ searchParams }) {
  const locale = await getServerLocale(searchParams)

  return (
    <>
      <Hero locale={locale} />
      <Features locale={locale} />
      <Gallery locale={locale} />
      <Brands locale={locale} />
      <Services locale={locale} />
      <Contact locale={locale} />
      <Footer locale={locale} />
    </>
  )
}
