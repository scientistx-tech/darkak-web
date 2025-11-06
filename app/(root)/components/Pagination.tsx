'use client';
interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  pageSize,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== current) {
      onChange(page);
    }
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    // show only nearby pages
    if (
      i === 1 ||
      i === totalPages ||
      (i >= current - 1 && i <= current + 1)
    ) {
      pages.push(i);
    } else if (
      (i === current - 2 && current > 3) ||
      (i === current + 2 && current < totalPages - 2)
    ) {
      pages.push('...');
    }
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-8"
    >
      {/* Prev button */}
      <button
        onClick={() => goToPage(current - 1)}
        disabled={current === 1}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((p, index) =>
        p === '...' ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => goToPage(p as number)}
            className={`px-3 py-1 text-sm rounded-md border border-gray-300 ${
              p === current
                ? 'bg-blue-500 text-white border-blue-500'
                : 'hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() => goToPage(current + 1)}
        disabled={current === totalPages}
        className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-100"
      >
        Next
      </button>
    </nav>
  );
}
