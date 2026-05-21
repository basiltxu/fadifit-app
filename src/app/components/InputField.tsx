import { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function InputField({
  label,
  error,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2.5">
      {label && (
        <label className="text-sm font-semibold text-foreground">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-5 py-4 
          bg-input-background 
          border border-input
          rounded-2xl
          text-foreground
          placeholder:text-muted-foreground
          focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
          transition-all
          ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive font-medium">{error}</p>
      )}
    </div>
  );
}