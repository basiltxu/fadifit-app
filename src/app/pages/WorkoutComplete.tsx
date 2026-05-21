import { useNavigate } from 'react-router';
import { Trophy } from 'lucide-react';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

export function WorkoutComplete() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8 inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-[2rem] shadow-2xl shadow-primary/30">
          <Trophy className="w-14 h-14 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Workout Complete!</h1>
        
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Great job! You've completed your workout. Keep up the momentum!
        </p>

        <div className="space-y-4">
          <PrimaryButton
            fullWidth
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </PrimaryButton>
          
          <SecondaryButton
            fullWidth
            onClick={() => navigate('/plan')}
          >
            View Plan
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}