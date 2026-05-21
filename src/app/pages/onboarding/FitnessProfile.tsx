import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { TopNav } from '../../components/TopNav';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 'light', label: 'Light', desc: '1-3 days per week' },
  { value: 'moderate', label: 'Moderate', desc: '3-5 days per week' },
  { value: 'active', label: 'Active', desc: '6-7 days per week' },
];

const fitnessLevels = [
  { value: 'beginner', label: 'Beginner', desc: 'New to fitness' },
  { value: 'intermediate', label: 'Intermediate', desc: '6-12 months experience' },
  { value: 'advanced', label: 'Advanced', desc: '1+ years experience' },
];

export function FitnessProfile() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [activityLevel, setActivityLevel] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [trainingDays, setTrainingDays] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      activityLevel,
      fitnessLevel,
      trainingDays: Number(trainingDays),
    });
    navigate('/onboarding/health');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Fitness Profile" showBack />
      
      <div className="px-6 py-6">
        <ProgressBar value={3} max={6} showLabel className="mb-8" />
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Activity Level
            </label>
            <div className="space-y-2">
              {activityLevels.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setActivityLevel(item.value)}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all text-left
                    ${
                      activityLevel === item.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="font-medium mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Fitness Level
            </label>
            <div className="space-y-2">
              {fitnessLevels.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFitnessLevel(item.value)}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all text-left
                    ${
                      fitnessLevel === item.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="font-medium mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Training Days per Week
            </label>
            <select
              value={trainingDays}
              onChange={(e) => setTrainingDays(e.target.value)}
              className="w-full px-4 py-4 bg-input-background border-2 border-transparent rounded-2xl text-foreground focus:border-primary focus:outline-none"
              required
            >
              <option value="">Select days</option>
              {[1, 2, 3, 4, 5, 6, 7].map(day => (
                <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>

          <PrimaryButton type="submit" fullWidth disabled={!activityLevel || !fitnessLevel || !trainingDays}>
            Continue
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
