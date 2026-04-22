import { motion } from 'framer-motion';

export type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'ALL' },
    { value: 'active', label: 'ACTIVE' },
    { value: 'completed', label: 'COMPLETED' }
  ];

  return (
    <motion.div
      id="filterElem"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6 p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

      {/* Filter section */}
      <div className="relative">
        <div className="mb-3">
          <span className="text-magenta text-xs font-bold">FILTER MODE:</span>
        </div>
        
        {/* Filter buttons */}
        <div className="flex gap-3">
          {filters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 border rounded transition-all duration-300 font-mono text-sm ${
                currentFilter === filter.value
                  ? 'border-yellow bg-yellow/10 text-yellow shadow-neon'
                  : 'border-magenta bg-cyber-black text-cyan hover:border-yellow hover:text-yellow'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.div>
  );
};

export default TodoFilter;
