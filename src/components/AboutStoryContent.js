'use client'

import { useSearchParams } from 'next/navigation'
import { getClientLocale } from '@/utils/locale'
import { useEffect, useState } from 'react'

export default function AboutStoryContent({ apiContent , searchParams}) {

  const [locale, setLocale] = useState('az')

  useEffect(() => {
    const currentLocale = searchParams?.locale || getClientLocale()
    setLocale(currentLocale)
  }, [searchParams])

  if (apiContent) {
    return <div dangerouslySetInnerHTML={{ __html: apiContent }} />
  }

  const getDefaultContent = () => {
    switch (locale) {
      case 'ru':
        return (
          <>
            <p>
              <strong>Компания Autonova была основана в 2019 году</strong> с целью открыть новую страницу на автомобильном рынке Азербайджана.
              Наша миссия - привозить лучшие образцы китайской автомобильной промышленности в Азербайджан,
              предоставляя нашим клиентам качественные автомобили по доступным ценам.
            </p>
            <p>
              Благодаря опыту, накопленному за годы работы, и надежным связям, которые мы создали,
              мы известны на азербайджанском рынке как <em>надежный партнер</em>. Мы тщательно отслеживаем
              все процессы от выбора каждого автомобиля до его доставки и считаем удовлетворенность клиентов приоритетом.
            </p>
            <p>
              Сегодня как Autonova мы успешно осуществили продажу <strong>более 500 автомобилей</strong> и
              завоевали доверие наших клиентов. В будущем мы продолжим укреплять нашу лидирующую позицию в этой области.
            </p>
          </>
        )
      case 'en':
        return (
          <>
            <p>
              <strong>Autonova company was founded in 2019</strong> with the aim of opening a new page in the
              Azerbaijan automotive market. Our mission is to bring the best examples of the Chinese automotive
              industry to Azerbaijan, providing our customers with quality and affordable automobiles.
            </p>
            <p>
              Thanks to the experience we have gained over the years and the reliable relationships we have created,
              we are known in the Azerbaijan market as a <em>reliable partner</em>. We carefully monitor all processes
              from the selection of each automobile to its delivery and consider customer satisfaction a priority.
            </p>
            <p>
              Today, as Autonova, we have successfully completed the sale of <strong>more than 500 automobiles</strong> and
              have gained the trust of our customers. In the future, we will continue to strengthen our leading position in this field.
            </p>
          </>
        )
      default: // 'az'
        return (
          <>
            <p>
              <strong>Autonova şirkəti 2019-cu ildə</strong> Azərbaycan avtomobil bazarında yeni bir səhifə açmaq məqsədi
              ilə yaradılmışdır. Bizim missiyamız Çin avtomobil sənayesinin ən yaxşı nümunələrini Azərbaycana
              gətirərək, müştərilərimizə keyfiyyətli və münasib qiymətli avtomobillər təqdim etməkdir.
            </p>
            <p>
              İllər ərzində qazandığımız təcrübə və yaratdığımız güvənli əlaqələr sayəsində biz Azərbaycan
              bazarında <em>etibarlı tərəfdaş</em> kimi tanınırıq. Hər bir avtomobilin seçimindən tutmuş
              çatdırılmasına qədər bütün prosesləri diqqətlə izləyir və müştəri məmnuniyyətini prioritet hesab edirik.
            </p>
            <p>
              Bugün Autonova olaraq <strong>500-dən çox avtomobilin</strong> uğurla satışını həyata keçirmişik və
              müştərilərimizin etimadını qazanmışıq. Gələcəkdə də bu sahədə lider mövqeyimizi
              möhkəmləndirməyə davam edəcəyik.
            </p>
          </>
        )
    }
  }

  return <div>{getDefaultContent()}</div>
}
