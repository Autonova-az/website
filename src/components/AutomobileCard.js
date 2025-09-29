import Image from 'next/image'
import Link from 'next/link'
import styles from './AutomobileCard.module.css'

export default function AutomobileCard({ car, viewMode = 'grid' }) {
  const formatPrice = (price) => {
    return `$${price.toLocaleString('en-US')}`
  }

  return (
    <div className={`${styles.carCard} ${viewMode === 'list' ? styles.carCardList : ''}`}>
      {!car.inStock && (
        <div className={styles.outOfStockBadge}>
          <span>Stokda yoxdur</span>
        </div>
      )}
      
      <div className={styles.carImageContainer}>
        <Image
          src={car.image}
          alt={car.name}
          width={400}
          height={250}
          className={styles.carImage}
        />
       
      </div>

      <div className={styles.carContent}>
        <div className={styles.carHeader}>
          <div className={styles.carBrand}>
            <span>{car.brand}</span>
          </div>
          {/* <div className={styles.carPrice}>
            <span className={styles.price}>{formatPrice(car.price)}</span>
          </div> */}
        </div>

        <h3 className={styles.carName}>{car.name}</h3>
        <p className={styles.carDescription}>{car.description}</p>

        <div className={styles.carSpecs}>
          <div className={styles.spec}>
            <i className="fas fa-car"></i>
            <span>{car.vin}</span>
          </div>
         
        </div>

        <div className={styles.carFeatures}>
          {car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className={styles.feature}>
              <i className="fas fa-check"></i>
              {feature}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className={styles.moreFeatures}>
              +{car.features.length - 3} daha çox
            </span>
          )}
        </div>

        <div className={styles.carActions}>
          <Link href={`/automobiles/${car.id}`} className={styles.detailsBtn}>
            <span>Ətraflı Bax</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
          <button className={styles.contactBtn}>
            <i className="fas fa-phone"></i>
            <span>Əlaqə</span>
          </button>
        </div>
      </div>
    </div>
  )
}