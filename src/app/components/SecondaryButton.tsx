import { ButtonHTMLAttributes } from 'react';

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export function SecondaryButton({
  children,
  fullWidth = false,
  className = '',
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={`
        bg-card text-foreground 
        border-2 border-border
        rounded-2xl px-6 py-4 
        font-semibold text-[15px]
        transition-all
        hover:border-primary/50 hover:bg-primary/5
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}