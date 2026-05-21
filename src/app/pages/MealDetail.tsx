import { useParams, useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { TopNav } from '../components/TopNav';
import { PrimaryButton } from '../components/PrimaryButton';
import { Check } from 'lucide-react';

export function MealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nutritionPlan, markMealEaten } = useApp();

  const meal = nutritionPlan.find(m => m.id === id);

  if (!meal) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav title="Meal" showBack />
        <div className="px-6 py-12 text-center">
          <p className="text-muted-foreground">Meal not found</p>
        </div>
      </div>
    );
  }

  const handleMarkEaten = () => {
    markMealEaten(meal.id);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNav title={meal.name} showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Meal Header */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-1">{meal.name}</h2>
              <p className="text-muted-foreground">{meal.time}</p>
            </div>
            {meal.eaten && (
              <div className="bg-primary rounded-full p-2">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold">{meal.calories}</div>
              <div className="text-xs text-muted-foreground">kcal</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">{meal.protein}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">{meal.carbs}g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-500">{meal.fats}g</div>
              <div className="text-xs text-muted-foreground">Fats</div>
            </div>
          </div>
        </div>

        {/* Foods List */}
        <div>
          <h3 className="font-bold mb-3">Foods</h3>
          <div className="space-y-2">
            {meal.foods.map((food, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-muted-foreground">{food.portion}</div>
                </div>
                <div className="text-sm font-medium">{food.calories} kcal</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      {!meal.eaten && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-6 pb-8">
          <div className="max-w-md mx-auto">
            <PrimaryButton
              fullWidth
              onClick={handleMarkEaten}
            >
              Mark as Eaten
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
