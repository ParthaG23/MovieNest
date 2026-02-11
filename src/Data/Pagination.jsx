const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // generate page numbers
  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2 flex-wrap">

        {/* PREV BUTTON */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-[#2a2a2a] text-white border border-white/10
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 text-sm font-semibold border border-white/10
              ${
                currentPage === page
                  ? "bg-yellow-400 text-black"
                  : "bg-[#2a2a2a] text-white hover:bg-[#3a3a3a]"
              }`}
          >
            {page}
          </button>
        ))}

        {/* NEXT BUTTON */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-[#2a2a2a] text-white border border-white/10
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default Pagination;
