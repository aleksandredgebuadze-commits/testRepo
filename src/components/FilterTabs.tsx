import { motion } from "framer-motion";
import { Filter } from "lucide-react";

type FilterType = "all" | "active" | "completed" | "unknown";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: { all: number; active: number; completed: number; unknown: number };
}

interface FilterConfig {
  id: FilterType;
  label: string;
}

// Filter tab configuration
const FILTER_CONFIGS: FilterConfig[] = [
  { id: "all", label: "ALL_DIRECTIVES" },
  { id: "active", label: "ACTIVE" },
  { id: "completed", label: "COMPLETED" },
  { id: "unknown", label: "UNKNOWN" },
];

const FilterTabs = ({
  activeFilter,
  onFilterChange,
  counts,
}: FilterTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6 p-4 border border-magenta bg-cyber-dark rounded-lg shadow-neon-magenta overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-magenta" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-magenta" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-magenta" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-magenta" />

      {/* Filter label */}
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-magenta" />
        <span className="text-xs text-magenta">FILTER MODE</span>
      </div>

      {/* Filter buttons */}
      <div className="relative flex gap-2">
        {FILTER_CONFIGS.map((filter) => {
          const isActive = activeFilter === filter.id;
          const count = counts[filter.id];

          return (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex-1 px-4 py-2 border rounded transition-all duration-300 ${
                isActive
                  ? "border-cyan bg-cyan/10 shadow-neon text-cyan"
                  : "border-magenta/50 bg-cyber-black text-magenta hover:border-yellow hover:text-yellow"
              }`}
            >
              {/* Active state background with shared layout animation */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan/5 rounded"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Label and count badge */}
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-xs font-bold">{filter.label}</span>
                <span
                  className={`px-1.5 py-0.5 text-xs rounded border ${
                    isActive
                      ? "border-cyan bg-cyan/20 text-cyan"
                      : "border-magenta/50 bg-magenta/10 text-magenta"
                  }`}
                >
                  {count}
                </span>
              </div>

              {/* Active state bottom glow */}
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan to-transparent"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-magenta to-transparent" />
    </motion.div>
  );
};

export default FilterTabs;
