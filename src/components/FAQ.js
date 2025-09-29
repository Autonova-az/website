'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

export default function FAQ({ data }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index)
  }

 

  return (
    <section className={styles.faqSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>
            <i className="fas fa-question-circle"></i>
            <span>Tez-tez Verilən Suallar</span>
          </div>
          <h2 className={styles.sectionTitle}>Ən Çox Soruşulan Suallar</h2>
          <p className={styles.sectionSubtitle}>Müştərilərimizin ən çox maraqlandığı mövzular</p>
        </div>

        <div className={styles.faqContainer}>
          {data.map((faq, index) => (
            <div
              key={faq.id}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <h4>{faq.question || 'Sual əlavə olunmayıb'}</h4>
                <div className={styles.faqIcon}>
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className={styles.faqAnswer}>
                <p>{faq.answer || 'Bu suala cavab hələ əlavə olunmayıb.'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
