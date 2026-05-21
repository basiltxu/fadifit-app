import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { TopNav } from '../components/TopNav';
import { User, Target, Bell, CreditCard, ChevronRight, Edit, Globe } from 'lucide-react';

export function Settings() {
  const navigate = useNavigate();
  const { user } = useApp();
  const { t } = useLanguage();

  const settingsItems = [
    {
      icon: User,
      label: t('settings.personalInfo'),
      subtitle: t('settings.personalInfoSubtitle'),
      path: '/settings/personal-info',
    },
    {
      icon: Target,
      label: t('settings.goalsPreferences'),
      subtitle: t('settings.goalsPreferencesSubtitle'),
      path: '/settings/goals',
    },
    {
      icon: Bell,
      label: t('settings.notifications'),
      subtitle: t('settings.notificationsSubtitle'),
      path: '/settings/notifications',
    },
    {
      icon: CreditCard,
      label: t('settings.subscription'),
      subtitle: t('settings.subscriptionSubtitle'),
      path: '/settings/subscription',
    },
    {
      icon: Globe,
      label: t('settings.language'),
      subtitle: t('settings.languageSubtitle'),
      path: '/language-select',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-8">
      <TopNav title={t('settings.title')} showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Profile Summary Card */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg tracking-tight truncate">{user?.name || 'User'}</h3>
              <p className="text-sm text-muted-foreground truncate">{user?.email || 'email@example.com'}</p>
            </div>
            <button
              onClick={() => navigate('/settings/personal-info')}
              className="w-10 h-10 bg-muted/30 rounded-2xl flex items-center justify-center hover:bg-muted/50 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="bg-card border border-border rounded-3xl overflow-hidden divide-y divide-border shadow-sm">
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full px-6 py-5 flex items-center gap-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-11 h-11 bg-muted/30 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="font-semibold text-[15px] mb-0.5 tracking-tight">{item.label}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>

        {/* App Info */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-bold mb-4 text-[15px] tracking-tight">{t('settings.about')}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">{t('settings.version')}</span>
              <span className="font-semibold">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">{t('settings.build')}</span>
              <span className="font-semibold">2026.04.17</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
