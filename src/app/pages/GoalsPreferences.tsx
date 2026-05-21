import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { TopNav } from '../components/TopNav';
import { PrimaryButton } from '../components/PrimaryButton';
import { Target, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

const fitnessGoals = [
  { id: 'lose-fat', label: 'Lose Fat', icon: TrendingDown },
  { id: 'gain-muscle', label: 'Gain Muscle', icon: TrendingUp },
  { id: 'maintain', label: 'Maintain', icon: Minus },
  { id: 'recomp', label: 'Recomposition', icon: Activity },
];

const activityLevels = [
  { id: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
  { id: 'light', label: 'Light', description: '1-3 days per week' },
  { id: 'moderate', label: 'Moderate', description: '3-5 days per week' },
  { id: 'active', label: 'Active', description: '6-7 days per week' },
  { id: 'very-active', label: 'Very Active', description: 'Intense daily training' },
];

const dietaryOptions = [
  'Balanced',
  'High Protein',
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
];

export function GoalsPreferences() {
  const navigate = useNavigate();
  const { user, updateUser } = useApp();

  const [selectedGoal, setSelectedGoal] = useState(user?.goal || 'gain-muscle');
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || 'moderate');
  const [trainingDays, setTrainingDays] = useState(user?.trainingDays?.toString() || '4');
  const [dietaryPrefs, setDietaryPrefs] = useState<string[]>(user?.dietaryPreferences || ['Balanced']);
  const [waterTarget, setWaterTarget] = useState('8');
  const [sleepTarget, setSleepTarget] = useState('8');

  const toggleDietaryPref = (pref: string) => {
    setDietaryPrefs(prev =>
      prev.includes(pref)
        ? prev.filter(p => p !== pref)
        : [...prev, pref]
    );
  };

  const handleSave = () => {
    updateUser({
      goal: selectedGoal,
      activityLevel,
      trainingDays: parseInt(trainingDays),
      dietaryPreferences: dietaryPrefs,
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNav title="Goals & Preferences" showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Fitness Goal */}
        <div>
          <h3 className="font-bold mb-4 text-[15px] tracking-tight text-muted-foreground uppercase">Fitness Goal</h3>
          <div className="grid grid-cols-2 gap-3">
            {fitnessGoals.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-5 rounded-3xl border-2 transition-all shadow-sm ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-border/70'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 mx-auto ${
                    isSelected ? 'bg-primary/10' : 'bg-muted/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className={`font-semibold text-sm ${isSelected ? 'text-primary' : ''}`}>
                    {goal.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <h3 className="font-bold mb-4 text-[15px] tracking-tight text-muted-foreground uppercase">Activity Level</h3>
          <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
            {activityLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActivityLevel(level.id)}
                className={`w-full px-5 py-4 text-left transition-colors ${
                  activityLevel === level.id ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    activityLevel === level.id ? 'border-primary' : 'border-border'
                  }`}>
                    {activityLevel === level.id && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${
                      activityLevel === level.id ? 'text-primary' : ''
                    }`}>
                      {level.label}
                    </div>
                    <div className="text-xs text-muted-foreground">{level.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Training Frequency */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <label className="block text-sm font-semibold mb-3 text-muted-foreground">Training Days Per Week</label>
          <select
            value={trainingDays}
            onChange={(e) => setTrainingDays(e.target.value)}
            className="w-full bg-background border border-border rounded-2xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
            ))}
          </select>
        </div>

        {/* Dietary Preferences */}
        <div>
          <h3 className="font-bold mb-4 text-[15px] tracking-tight text-muted-foreground uppercase">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((pref) => (
              <button
                key={pref}
                onClick={() => toggleDietaryPref(pref)}
                className={`px-5 py-2.5 rounded-2xl font-semibold text-sm transition-all ${
                  dietaryPrefs.includes(pref)
                    ? 'bg-gradient-to-r from-primary to-orange-600 text-white shadow-md shadow-primary/20'
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Water Target */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <label className="block text-sm font-semibold mb-3 text-muted-foreground">Daily Water Target (glasses)</label>
          <input
            type="range"
            min="4"
            max="12"
            value={waterTarget}
            onChange={(e) => setWaterTarget(e.target.value)}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">4 glasses</span>
            <span className="text-2xl font-bold text-primary">{waterTarget}</span>
            <span className="text-xs text-muted-foreground">12 glasses</span>
          </div>
        </div>

        {/* Sleep Target */}
        <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
          <label className="block text-sm font-semibold mb-3 text-muted-foreground">Sleep Target (hours)</label>
          <input
            type="range"
            min="6"
            max="10"
            value={sleepTarget}
            onChange={(e) => setSleepTarget(e.target.value)}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-muted-foreground">6 hours</span>
            <span className="text-2xl font-bold text-primary">{sleepTarget}</span>
            <span className="text-xs text-muted-foreground">10 hours</span>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-6 pb-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          <PrimaryButton fullWidth onClick={handleSave}>
            Save Preferences
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
