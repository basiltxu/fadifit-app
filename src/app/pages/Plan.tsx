import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { BottomNav } from '../components/BottomNav';
import { TopNav } from '../components/TopNav';
import { WorkoutCard } from '../components/WorkoutCard';

export function Plan() {
  const navigate = useNavigate();
  const { workoutPlan } = useApp();

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Workout Plan" />

      <div className="px-6 py-6 space-y-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-3xl p-6 mb-6 shadow-xl shadow-primary/20">
          <h2 className="font-bold text-xl mb-2 text-white tracking-tight">Your Weekly Plan</h2>
          <p className="text-[15px] text-white/90">
            {workoutPlan.length} workouts designed for your goals
          </p>
        </div>

        {workoutPlan.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onClick={() => navigate(`/plan/${workout.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}