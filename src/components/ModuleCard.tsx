import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color: "primary" | "accent" | "success" | "info";
  progress?: number;
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
};

const ModuleCard = ({ title, description, icon: Icon, to, color, progress }: ModuleCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        to={to}
        className="block bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow border border-border group"
      >
        <div className={`w-12 h-12 rounded-xl ${colorMap[color]} flex items-center justify-center mb-4`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-hero"
              />
            </div>
          </div>
        )}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Explore <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
};

export default ModuleCard;
