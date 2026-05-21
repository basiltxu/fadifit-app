import { useNavigate } from 'react-router';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { PrimaryButton } from '../components/PrimaryButton';
import { Globe, Check } from 'lucide-react';
import logo from '../../imports/logo.png';

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
  { code: 'es' as Language, name: 'Spanish', nativeName: 'Español' },
];

export function LanguageSelect() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleContinue = () => {
    localStorage.setItem('fadifit-language-selected', 'true');
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mb-8 inline-flex items-center justify-center">
            <img src={logo} alt="FadiFit" className="w-48 h-48 object-contain" />
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-orange-600 to-orange-700 rounded-[1.25rem] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-3 tracking-tight">{t('language.selectLanguage')}</h1>
          <p className="text-muted-foreground text-[15px]">{t('language.chooseLanguage')}</p>
        </div>

        {/* Language Options */}
        <div className="space-y-3 mb-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full p-5 rounded-3xl border-2 transition-all flex items-center justify-between ${
                language === lang.code
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-card hover:border-border/70'
              }`}
            >
              <div className="text-left">
                <div className={`font-bold text-lg ${language === lang.code ? 'text-primary' : ''}`}>
                  {lang.nativeName}
                </div>
                <div className="text-sm text-muted-foreground">{lang.name}</div>
              </div>
              {language === lang.code && (
                <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center">
                  <Check className="w-6 h-6 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <PrimaryButton fullWidth onClick={handleContinue}>
          {t('language.continue')}
        </PrimaryButton>
      </div>
    </div>
  );
}
