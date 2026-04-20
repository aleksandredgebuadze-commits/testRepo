import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, Circle } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    completionRate: number;
  };
}

const StatsPanel = ({ stats }: StatsPanelProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative mb-6 p-6 border border-cyan bg-cyber-dark rounded-lg shadow-neon overflow-hidden"
    >
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />

      {/* Stats cards row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Total Directives */}
        <div className="relative p-4 border border-cyan/30 bg-cyan/5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-cyan" />
            <span className="text-xs text-cyan/80">TOTAL DIRECTIVES</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-cyan"
          >
            {stats.total}
          </motion.div>
        </div>

        {/* Active Ops */}
        <div className="relative p-4 border border-magenta/30 bg-magenta/5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <Circle className="w-4 h-4 text-magenta" />
            <span className="text-xs text-magenta/80">ACTIVE OPS</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl font-bold text-magenta"
            >
              {stats.active}
            </motion.div>
            {stats.active > 0 && (
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-magenta shadow-neon-magenta"
              />
            )}
          </div>
        </div>

        {/* Completed Ops */}
        <div className="relative p-4 border border-green/30 bg-green/5 rounded">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green" />
            <span className="text-xs text-green/80">COMPLETED OPS</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl font-bold text-green"
          >
            {stats.completed}
          </motion.div>
        </div>
      </div>

      {/* Progress bar section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan">COMPLETION RATE</span>
          <motion.span 
            key={stats.completionRate}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-yellow font-bold"
          >
            {stats.completionRate}%
          </motion.span>
        </div>

        {/* Progress bar track */}
        <div className="relative h-4 bg-cyber-black border border-cyan/30 rounded-full overflow-hidden">
          {/* Progress bar fill */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionRate}%` }}
            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-cyan via-green to-green progress-bar-neon rounded-full"
          />

          {/* Animated shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      </div>

      {/* Decorative blur elements */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-cyan/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green/10 rounded-full blur-xl" />

      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan to-transparent" />
    </motion.div>
  );
};

export default StatsPanel;
