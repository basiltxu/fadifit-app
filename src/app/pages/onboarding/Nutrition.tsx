import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { TopNav } from '../../components/TopNav';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { FilterChip } from '../../components/FilterChip';

const dietaryPreferences = [
  'Balanced',
  'High Protein',
  'Vegetarian',
  'Vegan',
  'Gluten Free',
  'Dairy Free',
  'Keto',
  'Paleo',
];

export function Nutrition() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [mealsPerDay, setMealsPerDay] = useState('');

  const togglePreference = (pref: string) => {
    setSelectedPreferences(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      dietaryPreferences: selectedPreferences,
      mealsPerDay: Number(mealsPerDay),
    });
    navigate('/onboarding/review');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Nutrition" showBack />
      
      <div className="px-6 py-6">
        <ProgressBar value={5} max={6} showLabel className="mb-8" />
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Dietary Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {dietaryPreferences.map((pref) => (
                <FilterChip
                  key={pref}
                  label={pref}
                  selected={selectedPreferences.includes(pref)}
                  onClick={() => togglePreference(pref)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Meals per Day
            </label>
            <select
              value={mealsPerDay}
              onChange={(e) => setMealsPerDay(e.target.value)}
              className="w-full px-4 py-4 bg-input-background border-2 border-transparent rounded-2xl text-foreground focus:border-primary focus:outline-none"
              required
            >
              <option value="">Select meals</option>
              {[2, 3, 4, 5, 6].map(meals => (
                <option key={meals} value={meals}>{meals} meals</option>
              ))}
            </select>
          </div>

          <PrimaryButton type="submit" fullWidth disabled={selectedPreferences.length === 0 || !mealsPerDay}>
            Continue
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
