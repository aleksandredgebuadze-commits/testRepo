import { motion } from 'framer-motion';
import { List, CheckCircle2, Circle } from 'lucide-react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  const filters: { type: FilterType; label: string; icon: React.ReactNode }[] = [
    { type: 'all', label: 'ALL', icon: <List className="w-4 h-4" /> },
    { type: 'active', label: 'ACTIVE', icon: <Circle className="w-4 h-4" /> },
    { type: 'completed', label: 'COMPLETED', icon: <CheckCircle2 className="w-4 h-4" /> }
  ];

  return (
    <motion.div
      id="filterElem"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6"
    >
      {/* Filter container */}
      <div className="relative p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

        {/* Filter content */}
        <div className="relative">
          {/* Label */}
          <div className="mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan rounded-full animate-pulse" />
            <span className="text-cyan text-xs font-mono uppercase tracking-wider">Filter Directives</span>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.type}
                onClick={() => onFilterChange(filter.type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 px-4 py-2 border rounded font-mono text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  currentFilter === filter.type
                    ? 'border-yellow bg-yellow/10 text-yellow shadow-neon'
                    : 'border-magenta bg-cyber-black text-magenta hover:border-yellow hover:text-yellow'
                }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
      </div>

      {/* Decorative line */}
      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.div>
  );
};

export default TodoFilter;
