import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  color: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'gray' | 'gold';
  alert?: boolean;
  className?: string;
}

const colorMap = {
  red: { icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', value: 'text-red-400' },
  yellow: { icon: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', value: 'text-yellow-400' },
  green: { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', value: 'text-green-400' },
  blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', value: 'text-blue-400' },
  purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', value: 'text-purple-400' },
  gray: { icon: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20', value: 'text-gray-400' },
  gold: { icon: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', value: 'text-primary' },
};

export default function MetricCard({ label, value, subValue, icon: Icon, trend, color, alert, className = '' }: MetricCardProps) {
  const colors = colorMap[color];
  const TrendIcon = trend ? (trend.value > 0 ? TrendingUp : trend.value < 0 ? TrendingDown : Minus) : null;

  return (
    <div className={`bg-card border rounded-xl p-4 card-hover ${alert ? 'border-red-500/40 bg-red-500/5' : `border-border ${colors.border}`} ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon size={18} className={colors.icon} />
        </div>
        {trend && TrendIcon && (
          <div className={`flex items-center gap-1 text-xs font-mono-data ${trend.value > 0 ? 'text-green-400' : trend.value < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
            <TrendIcon size={12} />
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
        {alert && (
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">Alert</span>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold font-mono-data ${colors.value}`}>{value}</p>
        {subValue && <p className="text-xs text-muted-foreground mt-0.5 font-mono-data">{subValue}</p>}
        <p className="text-xs font-500 text-muted-foreground mt-1 uppercase tracking-wide">{label}</p>
      </div>
      {trend && (
        <p className="text-xs text-muted-foreground mt-2">{trend.label}</p>
      )}
    </div>
  );
}