import { motion } from "framer-motion";

type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// Available filter options for the todo list
const FILTER_OPTIONS: Array<{ value: FilterType; label: string }> = [
  { value: "all", label: "ALL" },
  { value: "active", label: "ACTIVE" },
  { value: "completed", label: "COMPLETED" },
];

// Generate className for filter button based on active state
const getFilterButtonStyles = (isActive: boolean): string => {
  const baseStyles =
    "flex-1 px-4 py-2 font-mono text-sm font-bold rounded border transition-all duration-300";
  const activeStyles =
    "bg-gradient-to-r from-cyan to-blue-500 border-cyan text-white shadow-neon";
  const inactiveStyles =
    "bg-cyber-black border-magenta text-magenta hover:border-yellow hover:text-yellow";

  return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
};

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <div id="filterElem" className="relative mb-6">
      {/* Container with cyberpunk border styling */}
      <div className="relative p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

        {/* Filter label */}
        <div className="mb-3">
          <span className="text-magenta font-mono text-xs tracking-wider">
            FILTER MODE:
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex gap-3">
          {FILTER_OPTIONS.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={getFilterButtonStyles(currentFilter === filter.value)}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
      </div>

      {/* Decorative line */}
      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </div>
  );
};

export default TodoFilter;
