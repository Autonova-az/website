import Image from 'next/image'
import styles from './TestimonialsSection.module.css'

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      text: "Autonova ilə işləmək həqiqətən professional təcrübə idi. BMW X5-imi Çindən gətirdilər və bütün proseslər şəffaf şəkildə həyata keçirildi.",
      author: "Əli Məmmədov",
      title: "BMW X5 sahibi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 2,
      text: "Məsləhət xidməti çox faydalı idi. Hansı modeli seçməli olduğum barədə ətraflı məlumat verdilər və maliyyə planlaşmasında da kömək etdilər.",
      author: "Leyla Həsənova",
      title: "Mercedes C-Class sahibi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 3,
      text: "Sənədləşdirmə prosesi çox sürətli və problemsiz keçdi. Bütün qanuni prosedurları onlar həll etdi və mən heç bir narahatlıq yaşamadım.",
      author: "Rəşad Quliyev",
      title: "Audi A6 sahibi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    }
  ]

  return (
    <section className={styles.testimonials}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-quote-left"></i>
            <span>Müştəri Rəyləri</span>
          </div>
          <h2 className="section-title">Müştərilərimizin Təcrübəsi</h2>
          <p className="section-subtitle">Real müştərilərimizin bizim haqqımızda dedikləri</p>
        </div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.testimonialCard}>
              <div className={styles.testimonialQuote}>
                <i className="fas fa-quote-left"></i>
              </div>
              
              <div className={styles.testimonialRating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>

              <p className={styles.testimonialText}>{testimonial.text}</p>

              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <h4>{testimonial.author}</h4>
                  <span>{testimonial.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.testimonialsStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.9</span>
            <span className={styles.statLabel}>Orta Reytinq</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Məmnun Müştəri</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>98%</span>
            <span className={styles.statLabel}>Məmnuniyyət</span>
          </div>
        </div>
      </div>
    </section>
  )
}