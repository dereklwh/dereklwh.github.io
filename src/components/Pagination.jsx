import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Reusable Pagination Component
 *
 * @param {number} currentPage - Current active page (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {string} variant - 'default' | 'compact' - compact shows fewer page numbers
 */
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default'
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = variant === 'compact' ? 3 : 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate range around current page
      let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages - 1, start + maxVisible - 1);

      // Adjust start if end is at the limit
      if (end === totalPages - 1) {
        start = Math.max(2, end - maxVisible + 1);
      }

      // Add ellipsis before middle section
      if (start > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle section
      if (end < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2 mt-10"
      role="navigation"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200 ease-out
          ${currentPage === 1
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-[#3e5d58] dark:text-[#a3c4bc] hover:bg-[#92ACA0]/20 hover:text-[#92ACA0] active:scale-95'
          }
        `}
        aria-label="Previous page"
        aria-disabled={currentPage === 1}
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-400 dark:text-gray-500"
            >
              ⋯
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`
                w-10 h-10 rounded-lg font-medium text-sm
                transition-all duration-200 ease-out
                ${currentPage === page
                  ? 'bg-[#92ACA0] text-white shadow-md shadow-[#92ACA0]/30'
                  : 'text-[#3e5d58] dark:text-[#a3c4bc] hover:bg-[#92ACA0]/20 hover:text-[#92ACA0] active:scale-95'
                }
              `}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center justify-center w-10 h-10 rounded-lg
          transition-all duration-200 ease-out
          ${currentPage === totalPages
            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
            : 'text-[#3e5d58] dark:text-[#a3c4bc] hover:bg-[#92ACA0]/20 hover:text-[#92ACA0] active:scale-95'
          }
        `}
        aria-label="Next page"
        aria-disabled={currentPage === totalPages}
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
