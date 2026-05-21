import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { TopNav } from '../components/TopNav';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export function AddProgress() {
  const navigate = useNavigate();
  const { addProgress } = useApp();
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProgress({
      date: new Date().toISOString(),
      weight: Number(weight),
      bodyFat: bodyFat ? Number(bodyFat) : undefined,
    });
    navigate('/progress');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav title="Add Progress" showBack />
      
      <div className="px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <InputField
            label="Weight (kg)"
            type="number"
            step="0.1"
            placeholder="70.0"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          <InputField
            label="Body Fat % (optional)"
            type="number"
            step="0.1"
            placeholder="15.0"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
          />

          <PrimaryButton type="submit" fullWidth>
            Save Progress
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
