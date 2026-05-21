import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import logo from '../../imports/logo.png';

export function Splash() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      const languageSelected = localStorage.getItem('fadifit-language-selected');

      if (!languageSelected) {
        navigate('/language-select');
      } else if (isAuthenticated && user?.goal) {
        navigate('/dashboard');
      } else if (isAuthenticated) {
        navigate('/onboarding/basic-info');
      } else {
        navigate('/welcome');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8 inline-flex items-center justify-center">
          <img src={logo} alt="FadiFit" className="w-48 h-48 object-contain" />
        </div>
        <p className="text-muted-foreground text-[15px]">Your fitness journey starts here</p>
        <div className="mt-10">
          <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    </div>
  );
}