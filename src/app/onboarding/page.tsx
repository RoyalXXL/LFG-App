import { FilterChipRow } from '@/features/tags/components/filter-chip-row';

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-4 p-4">
      <h1 className="text-2xl font-semibold">Personalize your matchmaking</h1>
      <p className="text-sm text-slate-500">Choose games, platforms, timezone, languages, and playstyle.</p>
      <FilterChipRow />
    </main>
  );
}