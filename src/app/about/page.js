import Footer from '@/components/Footer'
import Image from 'next/image'
import { getTranslation } from '@/locales/translations'
import { getServerLocale } from '@/utils/locale'
import AboutStoryContent from '@/components/AboutStoryContent'
import styles from './about.module.css'

export async function generateMetadata({ searchParams }) {
  const locale = await getServerLocale(searchParams)
  const t = (key) => getTranslation(locale, key)

  return {
    title: `${t('about.title')} - Autonova`,
    description: t('about.subtitle'),
  }
}

async function getAboutData(locale) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`${baseUrl}/about?locale=${locale}`, {
      cache: 'no-store' // Ensure fresh data on each request
    })

    if (!response.ok) {
      throw new Error('Failed to fetch about data')
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Error fetching about data:', error)
    return null
  }
}

export default async function About({ searchParams }) {
  const locale = await getServerLocale(searchParams)
  const aboutData = await getAboutData(locale)

  const t = (key) => getTranslation(locale, key)

  // Use API data for stats if available
  const stats = aboutData?.aboutData?.[0]?.statistics?.map(stat => ({
    icon: "fas fa-chart-line",
    number: parseInt(stat.number),
    label: stat.label,
    suffix: stat.suffix || ""
  })) || [];

  // Use API data for team members if available
  const teamMembers = aboutData?.teamMembers?.map(member => ({
    name: member.name,
    position: member.position,
    description: member.bio,
    image: member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    linkedin: member.linkedin,
    phone: member.phone
  })) || [];

  const values = [
    {
      icon: "fas fa-star",
      title: t('about.values.quality.title'),
      description: t('about.values.quality.description')
    },
    {
      icon: "fas fa-handshake",
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description')
    },
    {
      icon: "fas fa-heart",
      title: t('about.values.satisfaction.title'),
      description: t('about.values.satisfaction.description')
    },
    {
      icon: "fas fa-shield-alt",
      title: t('about.values.transparency.title'),
      description: t('about.values.transparency.description')
    }
  ]

  return (
    <>

      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.breadcrumb}>
              <i className="fas fa-home"></i>
              <a href={locale !== 'az' ? `/?locale=${locale}` : '/'}>{t('about.breadcrumb.home')}</a>
              <span>/</span>
              <span>{t('about.breadcrumb.about')}</span>
            </div>
            <h1 className={styles.pageTitle}>{t('about.title')}</h1>
            <p className={styles.pageSubtitle}>{t('about.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className={styles.companyStats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon}>
                  <i className={stat.icon}></i>
                </div>
                <div className={styles.statContent}>
                  <span className={styles.statNumber} data-count={stat.number}>
                    {stat.number}{stat.suffix && <span className={styles.statPlus}>{stat.suffix}</span>}
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className={styles.aboutDetailed}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutStory}>
              <div className={styles.storyHeader}>
                <h2>{t('about.ourStory')}</h2>
                <div className={styles.storyLine}></div>
              </div>
              <div className={styles.storyContent}>
                <AboutStoryContent searchParams ={ searchParams} apiContent={aboutData?.ourHistory?.content} />


                <div className={styles.storyHighlights}>
                  <div className={styles.highlightItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>{t('about.highlights.qualityCars')}</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>{t('about.highlights.documentation')}</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <i className="fas fa-check-circle"></i>
                    <span>{t('about.highlights.afterSales')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.aboutImageSection}>
              <div className={styles.imageContainer}>
                <Image
                  src={aboutData?.ourHistory?.header_image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"}
                  alt="Autonova Office"
                  width={600}
                  height={400}
                />
                <div className={styles.imageOverlay}>
                  <div className={styles.overlayContent}>
                    <h3>5+ {t('about.experienceYears')}</h3>
                    <p>{t('about.experienceField')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={styles.missionVision}>
        <div className="container">
          <div className={styles.mvGrid}>

            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-bullseye"></i>
              </div>
              <h3>{aboutData?.aboutData?.find(item => item.section_key === 'mission')?.title || 'Mission'}</h3>
              <div dangerouslySetInnerHTML={{
                __html: aboutData?.aboutData?.find(item => item.section_key === 'mission')?.content || 'Mission content'
              }} />
            </div>

            <div className={styles.visionCard}>
              <div className={styles.cardIcon}>
                <i className="fas fa-eye"></i>
              </div>
              <h3>{aboutData?.aboutData?.find(item => item.section_key === 'vision')?.title || 'Vision'}</h3>
              <div dangerouslySetInnerHTML={{
                __html: aboutData?.aboutData?.find(item => item.section_key === 'vision')?.content || 'Vision content'
              }} />
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.teamTitle')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.teamSubtitle')}</p>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <Image src={member.image} alt={member.name} width={300} height={300} />
                  <div className={styles.memberOverlay}>
                    <div className={styles.socialLinks}>
                      {member.linkedin &&
                        <a target='_blank' href={member.linkedin}><i className="fab fa-linkedin"></i></a>
                      }
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className={styles.phoneNumber}>
                          <i className="fa fa-phone"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.memberInfo}>
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                  <p>{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{t('about.valuesTitle')}</h2>
            <p className={styles.sectionSubtitle}>{t('about.valuesSubtitle')}</p>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
