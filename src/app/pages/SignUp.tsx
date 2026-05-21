import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../../imports/logo.png';
import { TopNav } from '../components/TopNav';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export function SignUp() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t('signup.passwordMismatch'));
      return;
    }
    signup(name, email, password);
    navigate('/onboarding/basic-info');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav title={t('auth.createAccountTitle')} showBack />

      <div className="px-6 py-8 max-w-md mx-auto">
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="mb-6 inline-flex items-center justify-center">
            <img src={logo} alt="FadiFit" className="w-32 h-32 object-contain" />
          </div>
          <p className="text-muted-foreground text-[15px]">{t('auth.createAccountSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label={t('auth.name')}
            type="text"
            placeholder={t('auth.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <InputField
            label={t('auth.confirmPassword')}
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="pt-2">
            <PrimaryButton type="submit" fullWidth>
              {t('auth.createAccountButton')}
            </PrimaryButton>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-4">
            {t('auth.alreadyHaveAccount')}{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-primary font-semibold hover:text-orange-600 transition-colors"
            >
              {t('auth.signInButton')}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}