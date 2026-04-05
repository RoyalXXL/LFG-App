'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export function GameSearchBar() {
  const [query, setQuery] = useState('');

  return (
    <label className="flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
      <Search className="h-4 w-4 text-slate-400" />
      <input
        aria-label="Search games"
        className="w-full bg-transparent text-sm outline-none"
        placeholder="Search games, tags, and open groups"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </label>
  );
}