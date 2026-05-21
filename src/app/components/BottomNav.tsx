import { Home, Calendar, TrendingUp, MessageCircle, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home, path: '/dashboard' },
    { id: 'plan', label: t('nav.plan'), icon: Calendar, path: '/plan' },
    { id: 'progress', label: t('nav.progress'), icon: TrendingUp, path: '/progress' },
    { id: 'messages', label: t('nav.messages'), icon: MessageCircle, path: '/messages' },
    { id: 'profile', label: t('nav.profile'), icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50 safe-area-bottom">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl transition-all min-w-[68px] ${
                isActive ? 'bg-primary/10' : 'hover:bg-muted/30'
              }`}
            >
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              />
              <span
                className={`text-xs whitespace-nowrap font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}