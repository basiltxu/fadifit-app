import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopNav } from '../components/TopNav';
import { PrimaryButton } from '../components/PrimaryButton';
import { Dumbbell, Utensils, Droplet, Bell } from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export function NotificationsSettings() {
  const navigate = useNavigate();

  const [workoutNotifications, setWorkoutNotifications] = useState<NotificationSetting[]>([
    { id: 'workout-reminder', label: 'Workout Reminders', description: 'Get notified before scheduled workouts', enabled: true },
    { id: 'missed-workout', label: 'Missed Workout Alerts', description: 'Alerts when you miss a workout', enabled: true },
    { id: 'rest-day', label: 'Rest Day Reminders', description: 'Remind you to take rest days', enabled: false },
  ]);

  const [nutritionNotifications, setNutritionNotifications] = useState<NotificationSetting[]>([
    { id: 'meal-reminder', label: 'Meal Reminders', description: 'Get notified for meal times', enabled: true },
    { id: 'calorie-tracking', label: 'Calorie Tracking', description: 'Daily calorie goal reminders', enabled: true },
  ]);

  const [waterReminder, setWaterReminder] = useState(true);
  const [waterFrequency, setWaterFrequency] = useState('60');

  const [generalNotifications, setGeneralNotifications] = useState<NotificationSetting[]>([
    { id: 'app-updates', label: 'App Updates', description: 'New features and improvements', enabled: true },
    { id: 'coach-messages', label: 'Coach Messages', description: 'Messages from your coach', enabled: true },
    { id: 'achievements', label: 'Achievements', description: 'Celebrate your milestones', enabled: true },
  ]);

  const toggleNotification = (
    list: NotificationSetting[],
    setList: React.Dispatch<React.SetStateAction<NotificationSetting[]>>,
    id: string
  ) => {
    setList(prev => prev.map(item =>
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  const handleSave = () => {
    navigate(-1);
  };

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-muted'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
        enabled ? 'translate-x-6' : 'translate-x-0.5'
      }`} />
    </button>
  );

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNav title="Notifications" showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Workout Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-bold text-[15px] tracking-tight text-muted-foreground uppercase">Workout Notifications</h3>
          </div>
          <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
            {workoutNotifications.map((notification) => (
              <div key={notification.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{notification.label}</span>
                  <ToggleSwitch
                    enabled={notification.enabled}
                    onToggle={() => toggleNotification(workoutNotifications, setWorkoutNotifications, notification.id)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Utensils className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-bold text-[15px] tracking-tight text-muted-foreground uppercase">Nutrition Notifications</h3>
          </div>
          <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
            {nutritionNotifications.map((notification) => (
              <div key={notification.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{notification.label}</span>
                  <ToggleSwitch
                    enabled={notification.enabled}
                    onToggle={() => toggleNotification(nutritionNotifications, setNutritionNotifications, notification.id)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Water Reminders */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Droplet className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-bold text-[15px] tracking-tight text-muted-foreground uppercase">Water Reminders</h3>
          </div>
          <div className="bg-card border border-border rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm mb-1">Water Reminders</div>
                <p className="text-xs text-muted-foreground">Stay hydrated throughout the day</p>
              </div>
              <ToggleSwitch
                enabled={waterReminder}
                onToggle={() => setWaterReminder(!waterReminder)}
              />
            </div>

            {waterReminder && (
              <div className="pt-3 border-t border-border/50">
                <label className="block text-xs font-semibold mb-3 text-muted-foreground">Reminder Frequency</label>
                <select
                  value={waterFrequency}
                  onChange={(e) => setWaterFrequency(e.target.value)}
                  className="w-full bg-background border border-border rounded-2xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                  <option value="90">Every 90 minutes</option>
                  <option value="120">Every 2 hours</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* General Notifications */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-bold text-[15px] tracking-tight text-muted-foreground uppercase">General Notifications</h3>
          </div>
          <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
            {generalNotifications.map((notification) => (
              <div key={notification.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">{notification.label}</span>
                  <ToggleSwitch
                    enabled={notification.enabled}
                    onToggle={() => toggleNotification(generalNotifications, setGeneralNotifications, notification.id)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-6 pb-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          <PrimaryButton fullWidth onClick={handleSave}>
            Save Notification Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
