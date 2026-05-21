import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}

export function StatCard({ icon: Icon, label, value, unit, color = 'text-primary' }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-3xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
          color === 'text-primary' ? 'bg-primary/10' : 'bg-accent/10'
        }`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
          {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
        </div>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
      </div>
    </div>
  );
}