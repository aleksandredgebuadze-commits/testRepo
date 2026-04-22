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
    { value: 'completed', label: 'COMPLETED' },
  ];

  return (
    <div 
      id="filterElem" 
      className="relative mb-6 p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

      {/* Filter label */}
      <div className="mb-3">
        <span className="text-xs text-magenta font-bold">{'> '} FILTER MODE</span>
      </div>

      {/* Decorative line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent mb-4" />

      {/* Filter buttons */}
      <div className="flex gap-3">
        {filters.map((filter) => (
          <motion.button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 px-4 py-2 border rounded transition-all duration-300 font-mono text-sm ${
              currentFilter === filter.value
                ? 'bg-magenta/30 border-magenta text-yellow shadow-neon-magenta'
                : 'bg-cyber-black border-cyan/50 text-cyan hover:border-yellow hover:text-yellow'
            }`}
          >
            {filter.label}
          </motion.button>
        ))}
      </div>

      {/* Decorative blur elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
    </div>
  );
};

export default TodoFilter;
