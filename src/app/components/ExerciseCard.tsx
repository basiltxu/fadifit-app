import { Exercise } from '../contexts/AppContext';
import { Weight, User } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

export function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  const getLoadTypeIcon = () => {
    if (exercise.loadType === 'bodyweight') {
      return <User className="w-3.5 h-3.5" />;
    }
    return <Weight className="w-3.5 h-3.5" />;
  };

  const getLoadTypeLabel = () => {
    if (exercise.loadType === 'bodyweight') return 'Bodyweight';
    if (exercise.loadType === 'machine') return 'Machine';
    return 'Weighted';
  };

  return (
    <div className="bg-card border border-border rounded-3xl p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
      <div className="flex gap-4 mb-3">
        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-bold text-primary">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold mb-1.5 tracking-tight group-hover:text-primary transition-colors">{exercise.name}</h4>
          <p className="text-sm text-primary font-semibold mb-1">
            {exercise.sets} sets × {exercise.reps}
          </p>
          {exercise.targetMuscles && (
            <p className="text-xs text-muted-foreground">{exercise.targetMuscles}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5 bg-muted/30 px-3 py-1.5 rounded-xl">
          {getLoadTypeIcon()}
          <span className="font-medium text-muted-foreground">{getLoadTypeLabel()}</span>
        </div>
        {exercise.defaultWeight && (
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-xl">
            <Weight className="w-3.5 h-3.5 text-primary" />
            <span className="font-semibold text-primary">{exercise.defaultWeight} kg</span>
          </div>
        )}
      </div>
    </div>
  );
}