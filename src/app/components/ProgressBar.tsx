interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max, showLabel = false, className = '' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`space-y-3 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="font-semibold text-muted-foreground">Progress</span>
          <span className="font-bold text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-orange-600 transition-all duration-300 rounded-full shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}