import styles from './AutomobileFilters.module.css'
import {getTranslation} from '../locales/translations'

export default function AutomobileFilters({
    locale,
    searchTerm,
    onSearchChange,
    vinCode,
    onVinChange,
    selectedFeatures, // Bu bir string dizisi olacak
    onFeaturesChange,
    selectedBrandId,
    onBrandChange,
    sortBy,
    sortOrder,
    onSortChange,
    features, // features objelerindeki id'ler number veya string olabilir
    brands,
    onClearFilters // Yeni prop
}) {

    const t = (key) => getTranslation(locale, key)

    const handleSearchChange = (value) => {
        onSearchChange(value)
    }

    const handleVinChange = (value) => {
        onVinChange(value)
    }

    const handleBrandChange = (value) => {
        onBrandChange(value)
    }

    const getSelectedBrandName = () => {
        if (!selectedBrandId) return ''
        const brand = brands.find(b => b.id.toString() === selectedBrandId.toString())
        return brand ? brand.name : ''
    }

    const getFeatureName = (featureId) => {
        const feature = features.find(f => f.id.toString() === featureId.toString())
        return feature ? feature.name : featureId
    }

    const handleSortChangeInternal = (e) => {
        const [field, order] = e.target.value.split('-')
        onSortChange(field, order)
    }

    const handleFeatureToggle = (featureId) => {
        const featureIdString = String(featureId); // Her zaman string olarak karşılaştır
        const updatedFeatures = selectedFeatures.includes(featureIdString)
            ? selectedFeatures.filter(f => f !== featureIdString)
            : [...selectedFeatures, featureIdString]

        onFeaturesChange(updatedFeatures)
    }

    const clearFilters = () => {
        if (onClearFilters) {
            onClearFilters();
        }
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

            {/* Sort */}
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>
                    <i className="fas fa-sort"></i>
                    {t('filters.sort')}
                </label>
                <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={handleSortChangeInternal} // Internal handler
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
                >
                    <option value="">
                        {t('filters.allBrands')}
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
                {(
                    <div className={styles.checkboxGroup}>
                        {features.map(feature => (
                            <label key={feature.id} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={selectedFeatures.includes(String(feature.id))} // feature.id'yi String'e çevir
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