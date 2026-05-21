import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { TopNav } from '../../components/TopNav';
import { InputField } from '../../components/InputField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';

const goals = [
  { value: 'lose-fat', label: 'Lose Fat', icon: '🔥' },
  { value: 'gain-muscle', label: 'Gain Muscle', icon: '💪' },
  { value: 'maintain', label: 'Maintain', icon: '⚖️' },
  { value: 'recomposition', label: 'Recomposition', icon: '⚡' },
];

export function BodyComposition() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [bodyFat, setBodyFat] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      bodyFat: Number(bodyFat),
      goal: goals.find(g => g.value === goal)?.label,
    });
    navigate('/onboarding/fitness-profile');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Body Composition" showBack />
      
      <div className="px-6 py-6">
        <ProgressBar value={2} max={6} showLabel className="mb-8" />
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <InputField
            label="Body Fat % (optional)"
            type="number"
            placeholder="15"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
          />

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Your Goal
            </label>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setGoal(item.value)}
                  className={`
                    p-4 rounded-2xl border-2 transition-all
                    ${
                      goal === item.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-medium">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton type="submit" fullWidth disabled={!goal}>
            Continue
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
