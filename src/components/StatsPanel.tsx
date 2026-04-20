import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, Circle, LucideIcon } from "lucide-react";

interface StatsPanelProps {
  stats: {
    total: number;
    active: number;
    completed: number;
    completionRate: number;
  };
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  color: "cyan" | "magenta" | "green";
  delay: number;
  showPulse?: boolean;
}

// Individual stat card component
const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  delay,
  showPulse,
}: StatCardProps) => {
  const colorClasses = {
    cyan: {
      border: "border-cyan/30",
      bg: "bg-cyan/5",
      text: "text-cyan",
      textMuted: "text-cyan/80",
    },
    magenta: {
      border: "border-magenta/30",
      bg: "bg-magenta/5",
      text: "text-magenta",
      textMuted: "text-magenta/80",
    },
    green: {
      border: "border-green/30",
      bg: "bg-green/5",
      text: "text-green",
      textMuted: "text-green/80",
    },
  };
  const classes = colorClasses[color];

  return (
    <div
      className={`relative p-4 border ${classes.border} ${classes.bg} rounded`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${classes.text}`} />
        <span className={`text-xs ${classes.textMuted}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay }}
          className={`text-3xl font-bold ${classes.text}`}
        >
          {value}
        </motion.div>
        {/* Pulsing indicator for active operations */}
        {showPulse && value > 0 && (
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`w-2 h-2 rounded-full bg-${color} shadow-neon-${color}`}
          />
        )}
      </div>
    </div>
  );
};

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
        <StatCard
          icon={BarChart3}
          label="TOTAL DIRECTIVES"
          value={stats.total}
          color="cyan"
          delay={0.3}
        />
        <StatCard
          icon={Circle}
          label="ACTIVE OPS"
          value={stats.active}
          color="magenta"
          delay={0.4}
          showPulse
        />
        <StatCard
          icon={CheckCircle2}
          label="COMPLETED OPS"
          value={stats.completed}
          color="green"
          delay={0.5}
        />
      </div>

      {/* Progress bar section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-cyan">COMPLETION RATE</span>
          {/* Animate percentage change using key prop to trigger re-mount */}
          <motion.span
            key={stats.completionRate}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-yellow font-bold"
          >
            {stats.completionRate}%
          </motion.span>
        </div>

        <div className="relative h-4 bg-cyber-black border border-cyan/30 rounded-full overflow-hidden">
          {/* Animated progress fill - transitions from cyan to green as completion increases */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.completionRate}%` }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-cyan via-green to-green progress-bar-neon rounded-full"
          />

          {/* Continuous shimmer effect for visual interest */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
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
