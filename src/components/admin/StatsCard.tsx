import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon: Icon, trend, className }: StatsCardProps) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 border border-[#E8E4DC] shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#6B7B6E] font-medium">{title}</p>
          <p className="text-3xl font-['Playfair_Display'] font-semibold text-[#2C3E2D] mt-2">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                'text-sm mt-2 font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}% from last month
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-[#2C3E2D]/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#2C3E2D]" />
        </div>
      </div>
    </div>
  );
};
