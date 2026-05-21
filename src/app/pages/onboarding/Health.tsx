import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { TopNav } from '../../components/TopNav';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { FilterChip } from '../../components/FilterChip';

const injuries = [
  'Knee',
  'Ankle',
  'Shoulder',
  'Back',
  'Wrist',
  'Neck',
  'Elbow',
  'Hip',
];

export function Health() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const [selectedInjuries, setSelectedInjuries] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleInjury = (injury: string) => {
    setSelectedInjuries(prev =>
      prev.includes(injury)
        ? prev.filter(i => i !== injury)
        : [...prev, injury]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      injuries: selectedInjuries,
    });
    navigate('/onboarding/nutrition');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Health" showBack />
      
      <div className="px-6 py-6">
        <ProgressBar value={4} max={6} showLabel className="mb-8" />
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Any Injuries? (Select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {injuries.map((injury) => (
                <FilterChip
                  key={injury}
                  label={injury}
                  selected={selectedInjuries.includes(injury)}
                  onClick={() => toggleInjury(injury)}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Additional Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any other health conditions or concerns..."
              className="w-full px-4 py-4 bg-input-background border-2 border-transparent rounded-2xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none"
              rows={4}
            />
          </div>

          <PrimaryButton type="submit" fullWidth>
            Continue
          </PrimaryButton>
        </form>
      </div>
    </div>
  );
}
