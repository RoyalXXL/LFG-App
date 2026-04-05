import { PropsWithChildren } from 'react';
import { cn } from '@/shared/lib/cn';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={cn('rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900', className)}>{children}</article>;
}
