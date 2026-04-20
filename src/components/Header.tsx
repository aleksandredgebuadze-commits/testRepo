import { Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mb-8 p-6 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

      {/* System status indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Activity className="w-6 h-6 text-cyan" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold text-cyan glitch" data-text="CYBERPUNK TODO">
              CYBERPUNK TODO
            </h1>
            <p className="text-sm text-magenta mt-1">v2.078 | SYSTEM ONLINE</p>
          </div>
        </div>

        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Terminal className="w-6 h-6 text-yellow" />
        </motion.div>
      </div>

      {/* Status bar */}
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="text-cyan">STATUS:</span>
        <motion.span 
          animate={{ color: ['#0ff0fc', '#f92aad', '#0ff0fc'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-magenta font-bold"
        >
          OPERATIONAL
        </motion.span>
      </div>

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.header>
  );
};

export default Header;
