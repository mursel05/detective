import { CaseSuspect } from "@/types/case";

interface SuspectsPanelProps {
  suspects: CaseSuspect[];
  onSelect: (suspectId: string) => void;
}

export default function SuspectsPanel({
  suspects,
  onSelect,
}: SuspectsPanelProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {suspects.map((suspect) => (
        <button
          key={suspect.id}
          onClick={() => onSelect(suspect.id)}
          className="flex flex-col items-center text-center bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-4 hover:border-[var(--accent)] transition-colors">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={suspect.avatar}
              alt={suspect.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-medium text-[var(--ink)] mt-3">
            {suspect.name}
          </p>
          <p className="text-xs text-[var(--ink-muted)] mt-0.5">
            {suspect.age} · {suspect.role}
          </p>
        </button>
      ))}
    </div>
  );
}
