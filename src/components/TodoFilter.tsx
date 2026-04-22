import { motion } from "framer-motion";

type FilterType = "all" | "active" | "completed";

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

// Filter configuration defines available filter options and their display labels
const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "active", label: "ACTIVE" },
  { value: "completed", label: "COMPLETED" },
];

const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
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

        {/* Filter label and buttons */}
        <div className="relative flex items-center gap-3">
          <span className="text-cyan text-sm font-mono font-bold">FILTER:</span>

          <div className="flex gap-2">
            {FILTER_OPTIONS.map((filter) => {
              const isActive = currentFilter === filter.value;

              return (
                <motion.button
                  key={filter.value}
                  onClick={() => onFilterChange(filter.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 border rounded font-mono text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-magenta border-magenta text-white shadow-neon-magenta"
                      : "bg-cyber-black border-cyan text-cyan hover:border-yellow hover:text-yellow"
                  }`}
                >
                  {filter.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Decorative blur elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
      </div>

      {/* Decorative line */}
      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.div>
  );
};

export default TodoFilter;
