import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { BottomNav } from '../components/BottomNav';
import { TopNav } from '../components/TopNav';
import { User, Settings, Target, Bell, CreditCard, LogOut, ChevronRight } from 'lucide-react';

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useApp();
  const { t } = useLanguage();

  const menuItems = [
    { icon: User, label: t('settings.personalInfo'), path: '/settings/personal-info' },
    { icon: Target, label: t('settings.goalsPreferences'), path: '/settings/goals' },
    { icon: Bell, label: t('settings.notifications'), path: '/settings/notifications' },
    { icon: Settings, label: t('settings.title'), path: '/settings' },
    { icon: CreditCard, label: t('settings.subscription'), path: '/settings/subscription' },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title={t('profile.title')} />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Profile Header - Enhanced design */}
        <div className="bg-card border border-border rounded-3xl p-8 text-center shadow-sm">
          <div className="w-24 h-24 bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-[2rem] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight">{user?.name}</h2>
          <p className="text-muted-foreground text-[15px]">{user?.email}</p>
          {user?.goal && (
            <div className="mt-4 inline-block bg-primary/10 text-primary px-5 py-2.5 rounded-2xl text-sm font-semibold">
              {user.goal}
            </div>
          )}
        </div>

        {/* Stats Grid - More refined */}
        {user?.weight && user?.height && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-3xl p-5 text-center shadow-sm">
              <div className="text-2xl font-bold mb-1.5 tracking-tight">{user.weight}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Weight (kg)</div>
            </div>
            <div className="bg-card border border-border rounded-3xl p-5 text-center shadow-sm">
              <div className="text-2xl font-bold mb-1.5 tracking-tight">{user.height}</div>
              <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Height (cm)</div>
            </div>
            {user.bodyFat && (
              <div className="bg-card border border-border rounded-3xl p-5 text-center shadow-sm">
                <div className="text-2xl font-bold mb-1.5 tracking-tight">{user.bodyFat}%</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Body Fat</div>
              </div>
            )}
          </div>
        )}

        {/* Menu Items - Better visual separation */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-semibold text-[15px]">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Logout Button - Better styling */}
        <button
          onClick={handleLogout}
          className="w-full bg-destructive/10 text-destructive rounded-3xl px-6 py-4 font-semibold flex items-center justify-center gap-2 hover:bg-destructive/15 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('profile.logout')}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}