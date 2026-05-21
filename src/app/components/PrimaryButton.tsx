import { ButtonHTMLAttributes } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export function PrimaryButton({
  children,
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`
        bg-gradient-to-r from-primary to-orange-600
        text-white 
        rounded-2xl px-6 py-4 
        font-semibold text-[15px]
        transition-all
        hover:shadow-xl hover:shadow-primary/30
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}