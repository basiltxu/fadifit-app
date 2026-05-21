import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../../imports/logo.png';
import { TopNav } from '../components/TopNav';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export function SignIn() {
  const navigate = useNavigate();
  const { login } = useApp();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav title={t('auth.signInButton')} showBack />

      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="mb-6 inline-flex items-center justify-center">
            <img src={logo} alt="FadiFit" className="w-32 h-32 object-contain" />
          </div>
          <h1 className="text-2xl font-bold mb-2 tracking-tight">{t('auth.welcomeBack')}</h1>
          <p className="text-muted-foreground text-[15px]">{t('auth.signInSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label={t('auth.email')}
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            label={t('auth.password')}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm text-primary font-semibold hover:text-orange-600 transition-colors"
            >
              {t('auth.forgotPassword')}
            </button>
          </div>

          <div className="pt-2">
            <PrimaryButton type="submit" fullWidth>
              {t('auth.signInButton')}
            </PrimaryButton>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            {t('auth.dontHaveAccount')}{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-primary font-semibold hover:text-orange-600 transition-colors"
            >
              {t('auth.createOne')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}