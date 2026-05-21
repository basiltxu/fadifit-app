import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { TopNav } from '../../components/TopNav';
import { InputField } from '../../components/InputField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ProgressBar } from '../../components/ProgressBar';

export function BasicInfo() {
  const navigate = useNavigate();
  const { updateUser } = useApp();
  const { t } = useLanguage();
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      gender,
      dateOfBirth,
      height: Number(height),
      weight: Number(weight),
    });
    navigate('/onboarding/body-composition');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopNav title={t('onboarding.basicInfo')} showBack />

      <div className="px-6 py-6">
        <ProgressBar value={1} max={6} showLabel className="mb-8" />

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2.5 block">
              {t('onboarding.gender')}
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-5 py-4 bg-input-background border border-input rounded-2xl text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
              required
            >
              <option value="">{t('onboarding.selectGender')}</option>
              <option value="male">{t('onboarding.male')}</option>
              <option value="female">{t('onboarding.female')}</option>
              <option value="other">{t('onboarding.other')}</option>
            </select>
          </div>

          <InputField
            label={t('onboarding.dateOfBirth')}
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />

          <InputField
            label={t('onboarding.height')}
            type="number"
            placeholder="175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />

          <InputField
            label={t('onboarding.weight')}
            type="number"
            placeholder="70"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />

          <div className="pt-4">
            <PrimaryButton type="submit" fullWidth>
              {t('common.continue')}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
}