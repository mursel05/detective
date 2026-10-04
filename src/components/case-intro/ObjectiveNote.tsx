interface ObjectiveNoteProps {
  objective: string;
}

export default function ObjectiveNote({ objective }: ObjectiveNoteProps) {
  return (
    <div className="bg-[var(--accent-soft)] border border-[var(--accent)]/30 rounded-[var(--radius-sm)] p-4">
      <p className="text-xs font-medium text-[var(--accent)] uppercase tracking-wide">
        Your Objective
      </p>
      <p className="text-sm text-[var(--ink)] mt-1">{objective}</p>
    </div>
  );
}