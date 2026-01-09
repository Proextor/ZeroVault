import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}

export default function MetricCard({
  icon: Icon,
  title,
  value,
  subtitle,
  trend,
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={`glass p-6 rounded-lg group hover:shadow-glow-cyan transition-all duration-300 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-cyan-glow/10 group-hover:bg-cyan-glow/20 transition-colors">
          <Icon className="w-5 h-5 text-cyan-glow" />
        </div>
      </div>

      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-cyan-glow">{value}</p>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${
              trend === 'up'
                ? 'text-green-400 bg-green-400/10'
                : trend === 'down'
                  ? 'text-red-400 bg-red-400/10'
                  : 'text-yellow-400 bg-yellow-400/10'
            }`}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  );
}
