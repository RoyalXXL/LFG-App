import { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return <span className="rounded-full bg-slate-200 px-2 py-1 text-xs dark:bg-slate-800">{children}</span>;
}
