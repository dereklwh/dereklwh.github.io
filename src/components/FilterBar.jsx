import { motion } from 'framer-motion';

// `tags` is an array of { name, count }. `id` keeps the sliding highlight scoped per bar.
const FilterBar = ({ id, tags, total, activeTag, onTagChange }) => {
  const options = [{ name: null, label: 'All', count: total }, ...tags.map((t) => ({ ...t, label: t.name }))];

  return (
    <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
      {options.map((option) => {
        const isActive = activeTag === option.name;
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onTagChange(option.name)}
            aria-pressed={isActive}
            className={`relative cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
              isActive
                ? 'border-transparent text-white dark:text-forest'
                : 'border-ink/15 text-ink/80 hover:border-sage hover:text-ink dark:border-fog/15 dark:text-fog/80 dark:hover:text-fog'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={`filter-active-${id}`}
                className="absolute inset-0 rounded-full bg-ink dark:bg-sage"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative">
              {option.label}
              {option.count != null && (
                <span className={`ml-1.5 font-mono text-[11px] ${isActive ? 'opacity-70' : 'text-sage'}`}>{option.count}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
