import { Badge } from '@/shared/ui/badge';

const defaultFilters = ['Platform', 'Activity', 'Language', 'Mic', 'Crossplay', 'Open slots', 'Beginner-friendly'];

export function FilterChipRow() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {defaultFilters.map((filter) => (
        <Badge key={filter}>{filter}</Badge>
      ))}
    </div>
  );
}