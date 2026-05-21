import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { BottomNav } from '../components/BottomNav';
import { TopNav } from '../components/TopNav';
import { MealCard } from '../components/MealCard';
import { ProgressBar } from '../components/ProgressBar';

export function Nutrition() {
  const navigate = useNavigate();
  const { nutritionPlan } = useApp();

  const totalCalories = nutritionPlan.reduce((sum, meal) => sum + meal.calories, 0);
  const eatenCalories = nutritionPlan
    .filter(meal => meal.eaten)
    .reduce((sum, meal) => sum + meal.calories, 0);
  
  const totalProtein = nutritionPlan.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = nutritionPlan.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFats = nutritionPlan.reduce((sum, meal) => sum + meal.fats, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Nutrition" />

      <div className="px-6 py-6 space-y-6 max-w-md mx-auto">
        {/* Daily Summary */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-lg mb-4">Daily Nutrition</h2>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Calories</span>
              <span className="font-medium">{eatenCalories} / {totalCalories} kcal</span>
            </div>
            <ProgressBar value={eatenCalories} max={totalCalories} />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{totalProtein}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{totalCarbs}g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{totalFats}g</div>
              <div className="text-xs text-muted-foreground">Fats</div>
            </div>
          </div>
        </div>

        {/* Meals */}
        <div>
          <h3 className="font-bold mb-3">Today's Meals</h3>
          <div className="space-y-3">
            {nutritionPlan.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onClick={() => navigate(`/nutrition/${meal.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
