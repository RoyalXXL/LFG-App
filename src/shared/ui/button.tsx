import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
        variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-700',
        variant === 'ghost' && 'hover:bg-slate-100 dark:hover:bg-slate-800',
        variant === 'outline' && 'border border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800',
        className,
      )}
      {...props}
    />
  );
}