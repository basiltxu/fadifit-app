import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { TopNav } from '../components/TopNav';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export function PersonalInfo() {
  const navigate = useNavigate();
  const { user, updateUser } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    gender: user?.gender || 'male',
    dateOfBirth: user?.dateOfBirth || '',
    height: user?.height?.toString() || '',
    weight: user?.weight?.toString() || '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUser({
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      height: parseInt(formData.height) || undefined,
      weight: parseInt(formData.weight) || undefined,
    });
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <TopNav title="Personal Info" showBack />

      <div className="px-6 py-6 max-w-md mx-auto space-y-6">
        {/* Basic Info Section */}
        <div>
          <h3 className="font-bold mb-4 text-[15px] tracking-tight text-muted-foreground uppercase">Basic Information</h3>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Phone Number (Optional)"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <label className="block text-sm font-semibold mb-3 text-muted-foreground">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full bg-background border border-border rounded-2xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Physical Stats Section */}
        <div>
          <h3 className="font-bold mb-4 text-[15px] tracking-tight text-muted-foreground uppercase">Physical Stats</h3>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Height (cm)"
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                placeholder="180"
              />
            </div>

            <div className="bg-card border border-border rounded-3xl p-5 shadow-sm">
              <InputField
                label="Weight (kg)"
                type="number"
                value={formData.weight}
                onChange={(e) => handleChange('weight', e.target.value)}
                placeholder="75"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border p-6 pb-8 shadow-2xl">
        <div className="max-w-md mx-auto">
          <PrimaryButton fullWidth onClick={handleSave}>
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
