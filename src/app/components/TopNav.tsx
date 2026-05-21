import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

interface TopNavProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function TopNav({ title, showBack = false, onBack, rightElement }: TopNavProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-b border-border z-40 safe-area-top">
      <div className="max-w-md mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          {title && (
            <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          )}
        </div>
        {rightElement && (
          <div>{rightElement}</div>
        )}
      </div>
    </div>
  );
}