'use client'
import styles from './Contact.module.css'
import { getTranslation } from '@/locales/translations'
import { useState, useEffect } from 'react';
import BASE_URL from '@/utils/baseurl';

export default function Contact({ locale = 'az' }) {
  const [interestAreas, setInterestAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchInterestAreas = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contact/interest-areas?locale=${locale}`);
        const result = await response.json();

        if (result.success) {
          setInterestAreas(result.data);
        }
      } catch (error) {
        console.error('Error fetching interest areas:', error);
        // Fallback to default options if API fails
      
        setInterestAreas(fallbackAreas[locale]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || null,
      interest_area_id: formData.get('subject') ? parseInt(formData.get('subject')) : null,
      message: formData.get('message')
    };

    try {
      const response = await fetch('http://localhost:8000/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitMessage(getTranslation(locale, 'contact.form.successMessage'));
        e.target.reset();
      } else {
        setSubmitMessage(getTranslation(locale, 'contact.form.errorMessage'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage(getTranslation(locale, 'contact.form.errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fas fa-phone-alt"></i>
            <span>{getTranslation(locale, 'contact.sectionBadge')}</span>
          </div>
          <h2 className="section-title">{getTranslation(locale, 'contact.sectionTitle')}</h2>
          <p className="section-subtitle">
            {getTranslation(locale, 'contact.sectionSubtitle')}
          </p>
        </div>

        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-phone"></i>
              </div>
              <div className={styles.contactDetails}>
                <h3>{getTranslation(locale, 'contact.info.phone.title')}</h3>
                {getTranslation(locale, 'contact.info.phone.values').map((phone, index) => (
                  <p key={index}>{phone}</p>
                ))}
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className={styles.contactDetails}>
                <h3>{getTranslation(locale, 'contact.info.email.title')}</h3>
                {getTranslation(locale, 'contact.info.email.values').map((email, index) => (
                  <p key={index}>{email}</p>
                ))}
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className={styles.contactDetails}>
                <h3>{getTranslation(locale, 'contact.info.address.title')}</h3>
                {getTranslation(locale, 'contact.info.address.values').map((address, index) => (
                  <p key={index}>{address}</p>
                ))}
              </div>
            </div>

            <div className={styles.contactCard}>
              <div className={styles.contactIcon}>
                <i className="fas fa-clock"></i>
              </div>
              <div className={styles.contactDetails}>
                <h3>{getTranslation(locale, 'contact.info.hours.title')}</h3>
                {getTranslation(locale, 'contact.info.hours.values').map((hours, index) => (
                  <p key={index}>{hours}</p>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">{getTranslation(locale, 'contact.form.name')}</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">{getTranslation(locale, 'contact.form.email')}</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">{getTranslation(locale, 'contact.form.phone')}</label>
                <input type="tel" id="phone" name="phone" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">{getTranslation(locale, 'contact.form.subject')}</label>
                <select id="subject" name="subject" disabled={loading}>
                  <option value="">
                    {loading ? getTranslation(locale, 'contact.form.loading') : getTranslation(locale, 'contact.form.selectSubject')}
                  </option>
                  {interestAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">{getTranslation(locale, 'contact.form.message')}</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>

              {submitMessage && (
                <div className={`${styles.submitMessage} ${submitMessage.includes(getTranslation(locale, 'contact.form.successMessage').split(' ')[0]) ? styles.success : styles.error}`}>
                  {submitMessage}
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <i className="fas fa-paper-plane"></i>
                <span>{submitting ? getTranslation(locale, 'contact.form.submitting') : getTranslation(locale, 'contact.form.submit')}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}