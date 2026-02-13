const FilterBar = ({ tags, activeTag, onTagChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onTagChange(null)}
        className={`
          px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95
          ${activeTag === null
            ? 'bg-[#92ACA0] text-white shadow-md shadow-[#92ACA0]/30'
            : 'border border-gray-300 dark:border-[#2f4f47] text-[#3e5d58] dark:text-[#a3c4bc] hover:bg-[#92ACA0]/20 hover:text-[#92ACA0]'
          }
        `}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={`
            px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95
            ${activeTag === tag
              ? 'bg-[#92ACA0] text-white shadow-md shadow-[#92ACA0]/30'
              : 'border border-gray-300 dark:border-[#2f4f47] text-[#3e5d58] dark:text-[#a3c4bc] hover:bg-[#92ACA0]/20 hover:text-[#92ACA0]'
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
