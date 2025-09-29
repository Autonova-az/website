import styles from './AutomobilePagination.module.css'

export default function AutomobilePagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const startPage = Math.max(1, currentPage - 2)
      const endPage = Math.min(totalPages, currentPage + 2)
      
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('...')
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const handlePageChange = (page) => {
    if (page !== currentPage && page !== '...' && page >= 1 && page <= totalPages) {
      onPageChange(page)
      // Scroll to top smoothly
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      })
    }
  }

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInfo}>
        <span>
          Səhifə {currentPage} / {totalPages}
        </span>
      </div>

      <div className={styles.pagination}>
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${styles.pageBtn} ${styles.prevBtn}`}
          aria-label="Əvvəlki səhifə"
        >
          <i className="fas fa-chevron-left"></i>
          <span>Əvvəlki</span>
        </button>

        {/* Page Numbers */}
        <div className={styles.pageNumbers}>
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              disabled={page === '...'}
              className={`${styles.pageBtn} ${styles.numberBtn} ${
                page === currentPage ? styles.active : ''
              } ${page === '...' ? styles.ellipsis : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${styles.pageBtn} ${styles.nextBtn}`}
          aria-label="Növbəti səhifə"
        >
          <span>Növbəti</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Quick Jump - Only show if more than 5 pages */}
      {totalPages > 5 && (
        <div className={styles.quickJump}>
          <span>Səhifəyə keç:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder={currentPage.toString()}
            onChange={(e) => {
              const page = parseInt(e.target.value)
              if (page >= 1 && page <= totalPages && !isNaN(page)) {
                handlePageChange(page)
              }
            }}
            className={styles.jumpInput}
          />
        </div>
      )}
    </div>
  )
}