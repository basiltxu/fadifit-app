import { useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../../imports/logo.png';
import { TopNav } from '../components/TopNav';
import { InputField } from '../components/InputField';
import { PrimaryButton } from '../components/PrimaryButton';

export function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      navigate('/signin');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav title="Reset Password" showBack />
      
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {!sent ? (
            <>
              <div className="text-center mb-10">
                <div className="mb-6 inline-flex items-center justify-center">
                  <img src={logo} alt="FadiFit" className="w-32 h-32 object-contain" />
                </div>
                <h1 className="text-2xl font-bold mb-2 tracking-tight">Reset Password</h1>
                <p className="text-muted-foreground text-[15px]">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <PrimaryButton type="submit" fullWidth>
                  Send Reset Link
                </PrimaryButton>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">Check your email</h2>
              <p className="text-muted-foreground text-[15px]">
                We've sent a password reset link to {email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}