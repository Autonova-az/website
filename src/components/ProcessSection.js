import styles from './ProcessSection.module.css'

export default function ProcessSection({ data }) {
 

  return (
    <section className={styles.features}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-route"></i>
            <span>İş Prosesi</span>
          </div>
          <h2 className="section-title">Necə İşləyirik?</h2>
          <p className="section-subtitle">
            Sadə və şəffaf 4 addımda avtomobilinizə sahib olun
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {data.map((step) => (
            <div key={step.id} className={styles.featureCard}>
              <div className={styles.featureNumber}>
                {step.formatted_step_number}
              </div>
              <div className={styles.featureIcon}>
                <i className={step.icon}></i>
                <div
                  className={styles.iconBg}
                
                ></div>
              </div>
              <h3>{step.title || 'Başlıq əlavə olunmayıb'}</h3>
              <p>{step.description || 'Təsvir əlavə olunmayıb'}</p>
              {step.duration && (
                <div className={styles.featureLink}>
                  <div className={styles.stepDuration}>
                    <i className="fas fa-clock"></i>
                    <span>{step.duration}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
