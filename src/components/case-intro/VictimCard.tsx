import { CaseVictim } from "@/types/case";

interface VictimCardProps {
  victim: CaseVictim;
}

export default function VictimCard({ victim }: VictimCardProps) {
  return (
    <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={victim.photo}
        alt={victim.name}
        className="w-12 h-12 rounded-full object-cover border border-[var(--border)]"
      />
      <div>
        <p className="text-sm font-medium text-[var(--ink)]">{victim.name}</p>
        <p className="text-xs text-[var(--ink-muted)]">
          {victim.age} years old, {victim.occupation}
        </p>
      </div>
    </div>
  );
}
