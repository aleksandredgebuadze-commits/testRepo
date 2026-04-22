import { motion } from 'framer-motion';
import { ListFilter } from 'lucide-react';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TodoFilter = ({ filter, onFilterChange }: TodoFilterProps) => {
  const filters: Array<{ value: 'all' | 'active' | 'completed'; label: string }> = [
    { value: 'all', label: 'ALL' },
    { value: 'active', label: 'ACTIVE' },
    { value: 'completed', label: 'COMPLETED' },
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
        <div className="relative flex items-center gap-3">
          {/* Filter icon */}
          <div className="flex items-center gap-2 text-cyan">
            <ListFilter className="w-5 h-5" />
            <span className="font-mono text-sm font-bold">FILTER:</span>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {filters.map((filterOption) => (
              <motion.button
                key={filterOption.value}
                onClick={() => onFilterChange(filterOption.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 border rounded font-mono text-sm font-bold transition-all duration-300 ${
                  filter === filterOption.value
                    ? 'bg-magenta border-magenta text-white shadow-neon-magenta'
                    : 'bg-cyber-black border-cyan text-cyan hover:border-yellow hover:text-yellow'
                }`}
              >
                {filterOption.label}
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
