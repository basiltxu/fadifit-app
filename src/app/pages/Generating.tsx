import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../../imports/logo.png';
import { Sparkles } from 'lucide-react';

const messages = [
  'Analyzing your goals...',
  'Building your workout plan...',
  'Calculating your calories...',
  'Optimizing your nutrition...',
  'Personalizing your experience...',
  'Almost ready...',
];

export function Generating() {
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 6000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8 inline-flex items-center justify-center">
          <img src={logo} alt="FadiFit" className="w-48 h-48 object-contain animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold mb-4 tracking-tight">Creating Your Plan</h1>
        
        <p className="text-lg text-muted-foreground mb-10 min-h-[1.75rem] transition-all">
          {messages[messageIndex]}
        </p>

        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}