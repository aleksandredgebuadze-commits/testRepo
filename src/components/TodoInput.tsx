import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative mb-6"
    >
      {/* Glitch effect container */}
      <div className="relative p-4 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

        {/* Input field */}
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER NEW DIRECTIVE..."
            className="w-full px-4 py-3 bg-cyber-black border border-magenta rounded text-magenta placeholder-text-muted focus:outline-none focus:border-yellow transition-colors duration-300 font-mono text-sm"
            style={{
              boxShadow: "inset 0 0 10px rgba(249, 42, 173, 0.2)",
            }}
          />

          {/* Blinking cursor */}
          <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-blink">
            <span className="inline-block w-[6px] h-[18px] bg-yellow rounded-sm" />
          </span>

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 255, 0, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-3 bg-gradient-to-r from-cyan to-blue-500 border border-cyan rounded text-white font-bold hover:shadow-neon transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>EXECUTE</span>
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-magenta/10 rounded-full blur-xl" />
      </div>

      {/* Decorative line */}
      <div className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.form>
  );
};

export default TodoInput;
