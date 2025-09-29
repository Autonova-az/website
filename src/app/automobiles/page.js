import { getServerLocale } from '@/utils/locale'
import AutomobilesClient from './AutomobilesClient'

export const metadata = {
  title: 'Avtomobil Qalereyası - Autonova',
  description: 'Çindən gətirilən keyfiyyətli avtomobillərin geniş seçimi. BYD, Geely, Chery və digər məşhur markaların ən yeni modelləri.',
}

export default async function AutomobilesPage({ searchParams }) {

  const locale = await getServerLocale(searchParams);

  return <AutomobilesClient locale={locale} />
}

