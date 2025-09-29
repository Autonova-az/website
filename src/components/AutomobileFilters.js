'use client'

import { useState, useEffect } from 'react'
import styles from './AutomobileFilters.module.css'
import { getTranslation } from '../locales/translations'
import BASE_URL from '@/utils/baseurl'

export default function AutomobileFilters({
  locale,
  searchTerm,
  onSearchChange,
  vinCode,
  onVinChange,
  selectedFeatures,
  onFeaturesChange,
  selectedBrandId,
  onBrandChange,
  sortBy,
  sortOrder,
  onSortChange
}) {
  const [brands, setBrands] = useState([])
  const [brandsLoading, setBrandsLoading] = useState(true)
  const [features, setFeatures] = useState([])
  const [featuresLoading, setFeaturesLoading] = useState(true)

  const t = (key) => getTranslation(locale, key)

  // Re-fetch data when locale changes
  useEffect(() => {
    if (!locale) return
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${BASE_URL}/brands?locale=${locale}`)
        const result = await response.json()

        if (result.success) {
          setBrands(result.data)
        }
      } catch (error) {
        console.error('Error fetching brands:', error)
        // Fallback to default brands if API fails
      } finally {
        setBrandsLoading(false)
      }
    }

    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${BASE_URL}/features?locale=${locale}`)
        const result = await response.json()

        if (result.success) {
          setFeatures(result.data)
        }
      } catch (error) {
        console.error('Error fetching features:', error)
        // Fallback to default features if API fails

      } finally {
        setFeaturesLoading(false)
      }
    }

    fetchBrands()
    fetchFeatures()
  }, [locale])

  const handleSearchChange = (value) => {
    onSearchChange(value)
  }

  const handleVinChange = (value) => {
    onVinChange(value)
  }

  const handleBrandChange = (value) => {
    onBrandChange(value)
  }

  // Get brand name by ID for display
  const getSelectedBrandName = () => {
    if (!selectedBrandId) return ''
    const brand = brands.find(b => b.id.toString() === selectedBrandId.toString())
    return brand ? brand.name : ''
  }

  // Get feature name by ID for display
  const getFeatureName = (featureId) => {
    const feature = features.find(f => f.id.toString() === featureId.toString())
    return feature ? feature.name : featureId
  }

  const handleSortChange = (field, order) => {
    onSortChange(field, order)
  }

  const handleFeatureToggle = (featureId) => {
    const updatedFeatures = selectedFeatures.includes(featureId.toString())
      ? selectedFeatures.filter(f => f !== featureId.toString())
      : [...selectedFeatures, featureId.toString()]

    onFeaturesChange(updatedFeatures)
  }

  const clearFilters = () => {
    onSearchChange('')
    onVinChange('')
    onFeaturesChange([])
    onBrandChange('')
    onSortChange('name', 'asc')
  }

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filtersHeader}>
        <h3>{t('filters.title')}</h3>
        <button onClick={clearFilters} className={styles.clearBtn}>
          <i className="fas fa-times"></i>
          {t('filters.clear')}
        </button>
      </div>
      {/* Active Filters */}
      <div className={styles.activeFilters}>
        <h4>{t('filters.activeFilters')}</h4>
        <div className={styles.activeFiltersList}>
          {selectedBrandId && (
            <span className={styles.activeFilter}>
              {t('filters.activeFilterLabels.brand')}: {getSelectedBrandName()}
              <button onClick={() => handleBrandChange('')}>
                <i className="fas fa-times"></i>
              </button>
            </span>
          )}
          {vinCode && (
            <span className={styles.activeFilter}>
              {t('filters.vinCode')}: {vinCode}
              <button onClick={() => handleVinChange('')}>
                <i className="fas fa-times"></i>
              </button>
            </span>
          )}
          {selectedFeatures && selectedFeatures.length > 0 && selectedFeatures.map(featureId => (
            <span key={featureId} className={styles.activeFilter}>
              {t('filters.features')}: {getFeatureName(featureId)}
              <button onClick={() => handleFeatureToggle(featureId)}>
                <i className="fas fa-times"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <i className="fas fa-search"></i>
          {t('filters.search')}
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={t('filters.searchPlaceholder')}
          className={styles.searchInput}
        />
      </div>

      {/* VIN Code */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <i className="fas fa-barcode"></i>
          {t('filters.vinCode')}
        </label>
        <input
          type="text"
          value={vinCode}
          onChange={(e) => handleVinChange(e.target.value)}
          placeholder={t('filters.vinCodePlaceholder')}
          className={styles.searchInput}
        />
      </div>

      {/* Sort */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <i className="fas fa-sort"></i>
          {t('filters.sort')}
        </label>
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-')
            handleSortChange(field, order)
          }}
          className={styles.filterSelect}
        >
          <option value="name-asc">{t('filters.sortOptions.nameAsc')}</option>
          <option value="name-desc">{t('filters.sortOptions.nameDesc')}</option>
          <option value="year-desc">{t('filters.sortOptions.yearDesc')}</option>
          <option value="year-asc">{t('filters.sortOptions.yearAsc')}</option>
        </select>
      </div>

      {/* Brand Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <i className="fas fa-car"></i>
          {t('filters.brand')}
        </label>
        <select
          value={selectedBrandId}
          onChange={(e) => handleBrandChange(e.target.value)}
          className={styles.filterSelect}
          disabled={brandsLoading}
        >
          <option value="">
            {brandsLoading ? t('common.loading') : t('filters.allBrands')}
          </option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </div>



      {/* Features Filter */}
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          <i className="fas fa-star"></i>
          {t('filters.features')}
        </label>
        {featuresLoading ? (
          <div className={styles.loadingText}>{t('common.loading')}</div>
        ) : (
          <div className={styles.checkboxGroup}>
            {features.map(feature => (
              <label key={feature.id} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature.id.toString())}
                  onChange={() => handleFeatureToggle(feature.id)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  {feature.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>




    </div>
  )
}