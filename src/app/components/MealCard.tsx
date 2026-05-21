import { Check } from 'lucide-react';
import { Meal } from '../contexts/AppContext';

interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
}

export function MealCard({ meal, onClick }: MealCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card border border-border rounded-3xl p-6 text-left hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1.5 tracking-tight group-hover:text-primary transition-colors">{meal.name}</h3>
          <p className="text-sm text-muted-foreground font-medium">{meal.time}</p>
        </div>
        {meal.eaten && (
          <div className="bg-accent rounded-2xl p-2">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-foreground font-bold text-base">{meal.calories}</span>
          <span className="text-muted-foreground font-medium">kcal</span>
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="flex items-center gap-3 text-muted-foreground font-medium">
          <span>P: {meal.protein}g</span>
          <span>C: {meal.carbs}g</span>
          <span>F: {meal.fats}g</span>
        </div>
      </div>
    </button>
  );
}