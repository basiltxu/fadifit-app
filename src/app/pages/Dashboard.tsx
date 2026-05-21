import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import logo from '../../imports/logo.png';
import { BottomNav } from '../components/BottomNav';
import { StatCard } from '../components/StatCard';
import { WorkoutCard } from '../components/WorkoutCard';
import { MealCard } from '../components/MealCard';
import { Flame, Droplet, Dumbbell, User, TrendingUp, Plus } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, workoutPlan, nutritionPlan, waterIntake, addWater } = useApp();

  const todayWorkout = workoutPlan[0];
  const totalCalories = nutritionPlan.reduce((sum, meal) => sum + meal.calories, 0);
  const eatenCalories = nutritionPlan
    .filter(meal => meal.eaten)
    .reduce((sum, meal) => sum + meal.calories, 0);
  
  const workoutProgress = workoutPlan.filter(w => w.completed).length / workoutPlan.length * 100;
  const timeOfDay = new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header - Refined with logo */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FadiFit" className="h-8 object-contain" />
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="w-11 h-11 bg-muted/50 rounded-2xl flex items-center justify-center hover:bg-muted transition-colors"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 pt-6 pb-6 space-y-6 max-w-md mx-auto">
        {/* Welcome Card - Enhanced premium feel */}
        <div className="bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-3xl p-6 text-white shadow-2xl shadow-primary/20">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Good {timeOfDay}, {user?.name}!</h2>
          <p className="text-white/90 mb-5 text-[15px]">{user?.goal}</p>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 w-fit">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold text-[15px]">{Math.round(workoutProgress)}% weekly progress</span>
          </div>
        </div>

        {/* Stats Row - Improved spacing and visual balance */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            icon={Flame}
            label="Calories"
            value={eatenCalories}
            unit={`/${totalCalories}`}
            color="text-primary"
          />
          <StatCard
            icon={Droplet}
            label="Water"
            value={waterIntake}
            unit={`/8 cups`}
            color="text-accent"
          />
          <StatCard
            icon={Dumbbell}
            label="Workouts"
            value={workoutPlan.filter(w => w.completed).length}
            unit={`/${workoutPlan.length}`}
            color="text-primary"
          />
        </div>

        {/* Today's Workout - Better section spacing */}
        {todayWorkout && !todayWorkout.completed && (
          <div>
            <h3 className="font-bold mb-4 text-[17px] tracking-tight">Today's Workout</h3>
            <WorkoutCard
              workout={todayWorkout}
              onClick={() => navigate(`/plan/${todayWorkout.id}`)}
            />
          </div>
        )}

        {/* Meals Overview - Improved header spacing */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[17px] tracking-tight">Today's Meals</h3>
            <button
              onClick={() => navigate('/nutrition')}
              className="text-sm text-primary font-semibold hover:text-orange-600 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {nutritionPlan.slice(0, 2).map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onClick={() => navigate(`/nutrition/${meal.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Water Tracker - Enhanced design with accent color */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent/10 rounded-2xl flex items-center justify-center">
                <Droplet className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-[17px] tracking-tight">Water Intake</h3>
            </div>
            <span className="text-sm text-muted-foreground font-medium">{waterIntake}/8 cups</span>
          </div>
          <div className="flex gap-2 mb-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i < waterIntake ? 'bg-accent shadow-sm' : 'bg-muted/50'
                }`}
              />
            ))}
          </div>
          <button
            onClick={addWater}
            className="w-full py-3.5 bg-accent/10 text-accent rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-accent/15 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Glass
          </button>
        </div>

        {/* Quick Actions - Better proportions */}
        <div className="grid grid-cols-2 gap-4">
          <PrimaryButton onClick={() => navigate('/plan')}>
            Start Workout
          </PrimaryButton>
          <button
            onClick={() => navigate('/progress/add')}
            className="bg-card border-2 border-border text-foreground rounded-2xl px-6 py-4 font-semibold hover:border-border/50 transition-colors"
          >
            Log Progress
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}