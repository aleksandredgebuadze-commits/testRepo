import { motion } from "framer-motion";
import type { FilterType } from "../types";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// Filter options displayed in the UI
const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: "ALL", value: "all" },
  { label: "ACTIVE", value: "active" },
  { label: "COMPLETED", value: "completed" },
];

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <motion.div
      id="filterElem"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      {/* Container with cyberpunk border */}
      <div className="relative p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

        {/* Filter label */}
        <div className="mb-3">
          <span className="text-xs text-magenta font-bold">[FILTER MODE]</span>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-3">
          {FILTER_OPTIONS.map(({ label, value }) => (
            <motion.button
              key={value}
              onClick={() => onFilterChange(value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 px-4 py-2 border rounded transition-all duration-300 font-mono text-sm ${
                currentFilter === value
                  ? "bg-magenta border-magenta text-black shadow-neon-magenta"
                  : "bg-cyber-black border-cyan text-cyan hover:border-yellow hover:text-yellow"
              }`}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Decorative line */}
        <div className="mt-3 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </div>
    </motion.div>
  );
};

export default TodoFilter;
