import { useNavigate } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../../imports/logo.png';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';

export function Welcome() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 inline-flex items-center justify-center">
          <img
            src={logo}
            alt="FadiFit"
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Subtitle Text */}
        <p className="text-[15px] text-center text-muted-foreground max-w-[340px] leading-relaxed mb-12">
          {t('welcome.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="w-full space-y-4">
          <PrimaryButton
            fullWidth
            onClick={() => navigate('/signup')}
          >
            {t('welcome.createAccount')}
          </PrimaryButton>

          <SecondaryButton
            fullWidth
            onClick={() => navigate('/signin')}
          >
            {t('welcome.signIn')}
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}