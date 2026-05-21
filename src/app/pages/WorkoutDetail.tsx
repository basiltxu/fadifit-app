import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { TopNav } from '../components/TopNav';
import { PrimaryButton } from '../components/PrimaryButton';
import { ExerciseCard } from '../components/ExerciseCard';
import { Clock, Flame } from 'lucide-react';

export function WorkoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { workoutPlan } = useApp();

  const workout = workoutPlan.find(w => w.id === id);

  if (!workout) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav title="Workout" showBack />
        <div className="px-6 py-12 text-center">
          <p className="text-muted-foreground">Workout not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNav title={workout.name} showBack />

      <div className="px-6 py-6 max-w-md mx-auto">
        {/* Workout Header - Enhanced design */}
        <div className="bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-3xl p-6 mb-6 text-white shadow-xl shadow-primary/20">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">{workout.name}</h2>
          <p className="text-white/90 mb-5 text-[15px]">{workout.focus}</p>
          
          <div className="flex items-center gap-5 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2.5">
              <Flame className="w-4 h-4" />
              <span className="font-semibold">{workout.exercises.length} exercises</span>
            </div>
          </div>

          {workout.completed && (
            <div className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2.5 rounded-2xl text-sm font-semibold text-center">
              ✓ Completed
            </div>
          )}
        </div>

        {/* Exercise List - Better spacing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[17px] tracking-tight">Exercises</h3>
            <span className="text-sm text-muted-foreground font-medium">{workout.exercises.length} total</span>
          </div>
          {workout.exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
            />
          ))}
        </div>

        {/* Workout Tips */}
        <div className="bg-muted/30 border border-border/50 rounded-3xl p-5 mt-6">
          <h4 className="font-bold mb-3 text-sm tracking-tight">Workout Tips</h4>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Log your reps and weight for each set to track progress</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Suggested weights are displayed but you can adjust them</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Use the dropset feature for advanced training techniques</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Rest timers will automatically start between sets</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sticky CTA - More premium */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-6 pb-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          <PrimaryButton
            fullWidth
            onClick={() => navigate(`/workout/${workout.id}`)}
          >
            {workout.completed ? 'Do Again' : 'Start Workout'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}