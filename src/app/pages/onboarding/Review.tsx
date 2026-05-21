import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { TopNav } from '../../components/TopNav';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';
import { Edit2 } from 'lucide-react';

export function Review() {
  const navigate = useNavigate();
  const { user } = useApp();

  const handleGeneratePlan = () => {
    navigate('/generating');
  };

  const sections = [
    {
      title: 'Basic Info',
      items: [
        { label: 'Gender', value: user?.gender },
        { label: 'Date of Birth', value: user?.dateOfBirth },
        { label: 'Height', value: user?.height ? `${user.height} cm` : undefined },
        { label: 'Weight', value: user?.weight ? `${user.weight} kg` : undefined },
      ],
      editPath: '/onboarding/basic-info',
    },
    {
      title: 'Goals',
      items: [
        { label: 'Body Fat', value: user?.bodyFat ? `${user.bodyFat}%` : 'Not specified' },
        { label: 'Goal', value: user?.goal },
      ],
      editPath: '/onboarding/body-composition',
    },
    {
      title: 'Fitness',
      items: [
        { label: 'Activity Level', value: user?.activityLevel },
        { label: 'Fitness Level', value: user?.fitnessLevel },
        { label: 'Training Days', value: user?.trainingDays ? `${user.trainingDays} days/week` : undefined },
      ],
      editPath: '/onboarding/fitness-profile',
    },
    {
      title: 'Health',
      items: [
        { label: 'Injuries', value: user?.injuries && user.injuries.length > 0 ? user.injuries.join(', ') : 'None' },
      ],
      editPath: '/onboarding/health',
    },
    {
      title: 'Nutrition',
      items: [
        { label: 'Dietary Preferences', value: user?.dietaryPreferences && user.dietaryPreferences.length > 0 ? user.dietaryPreferences.join(', ') : 'None' },
        { label: 'Meals per Day', value: user?.mealsPerDay },
      ],
      editPath: '/onboarding/nutrition',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title="Review" showBack />
      
      <div className="px-6 py-6">
        <ProgressBar value={6} max={6} showLabel className="mb-8" />
        
        <div className="max-w-md mx-auto space-y-4">
          <p className="text-muted-foreground mb-6 text-[15px] leading-relaxed">
            Review your information before we generate your personalized plan.
          </p>

          {sections.map((section) => (
            <div key={section.title} className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[17px] tracking-tight">{section.title}</h3>
                <button
                  onClick={() => navigate(section.editPath)}
                  className="p-2 hover:bg-primary/10 rounded-xl transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-primary" />
                </button>
              </div>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{item.label}</span>
                    <span className="font-semibold">{item.value || 'Not set'}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <PrimaryButton onClick={handleGeneratePlan} fullWidth className="mt-8">
            Generate My Plan
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}