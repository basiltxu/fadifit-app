import { Clock, Flame } from 'lucide-react';
import { WorkoutDay } from '../contexts/AppContext';

interface WorkoutCardProps {
  workout: WorkoutDay;
  onClick?: () => void;
}

export function WorkoutCard({ workout, onClick }: WorkoutCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card border border-border rounded-3xl p-6 text-left hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1.5 tracking-tight group-hover:text-primary transition-colors">{workout.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{workout.focus}</p>
        </div>
        {workout.completed && (
          <div className="bg-accent/10 text-accent px-3 py-1.5 rounded-xl text-xs font-semibold">
            Completed
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted/30 rounded-xl flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-medium">{workout.duration} min</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
            <Flame className="w-4 h-4 text-primary" />
          </div>
          <span className="font-medium">{workout.exercises.length} exercises</span>
        </div>
      </div>
    </button>
  );
}