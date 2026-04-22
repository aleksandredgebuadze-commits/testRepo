import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export type FilterType = "all" | "active" | "completed";

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: "all", label: "ALL" },
  { value: "active", label: "ACTIVE" },
  { value: "completed", label: "COMPLETED" },
];

const TodoList = ({
  todos,
  onToggle,
  onDelete,
  filter,
  onFilterChange,
}: TodoListProps) => {
  return (
    <>
      {/* Filter bar - cyberpunk themed buttons to filter between all/active/completed todos */}
      <motion.div
        id="filterElem"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mb-6 p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden"
      >
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

        {/* Decorative blur elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />

        <div className="relative flex items-center gap-3">
          <span className="text-cyan text-sm font-bold">FILTER:</span>
          <div className="flex gap-2">
            {FILTER_OPTIONS.map(({ value, label }) => (
              <motion.button
                key={value}
                onClick={() => onFilterChange(value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 border rounded transition-all duration-300 text-xs font-bold ${
                  filter === value
                    ? "bg-magenta/30 border-magenta text-magenta shadow-neon-magenta"
                    : "bg-cyber-black border-cyan/50 text-cyan hover:border-yellow hover:text-yellow"
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
      </motion.div>

      <AnimatePresence>
        {todos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-magenta text-sm">NO ACTIVE DIRECTIVES</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 border rounded-lg transition-all duration-300 slide-up ${
                  todo.completed
                    ? "border-green/50 bg-cyber-black"
                    : "border-magenta bg-cyber-dark shadow-neon-magenta"
                }`}
              >
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-current" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-current" />

                {/* Content */}
                <div className="relative">
                  {/* Checkbox */}
                  <motion.button
                    onClick={() => onToggle(todo.id)}
                    whileTap={{ scale: 0.9 }}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 border rounded transition-all duration-300 ${
                      todo.completed
                        ? "bg-green border-green shadow-neon"
                        : "border-magenta hover:border-yellow"
                    }`}
                  >
                    {todo.completed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-green rounded-sm"
                      />
                    )}
                  </motion.button>

                  {/* Text */}
                  <span
                    className={`block pl-8 pr-2 py-1 font-mono text-sm transition-all duration-300 ${
                      todo.completed
                        ? "text-green/50 line-through decoration-2"
                        : "text-cyan"
                    }`}
                  >
                    {todo.text}
                  </span>

                  {/* Delete button */}
                  <motion.button
                    onClick={() => onDelete(todo.id)}
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-magenta hover:text-yellow transition-colors duration-300"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Status indicator */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                  <span
                    className={todo.completed ? "text-green" : "text-magenta"}
                  >
                    {todo.completed ? "[DONE]" : "[PENDING]"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoList;
