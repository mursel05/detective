"use client";

import { Clue } from "@/types/case";

interface Props {
  clue: Clue;
  read: boolean;
  onOpen: (id: string) => void;
}

export default function ClueCard({ clue, read, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(clue.id)}
      className="text-left bg-[var(--surface-raised)] border border-[var(--line)] rounded-[var(--radius-md)] p-4 w-full hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-center justify-between">
        <span className="inline-block text-[11px] font-medium text-[var(--accent)] bg-[var(--accent-soft)] rounded-full px-2 py-0.5">
          Exhibit: {clue.title}
        </span>
        {read && (
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
        )}
      </div>
      <h3 className="font-semibold text-[15px] text-[var(--ink)] mt-3 tracking-tight">
        {clue.title}
      </h3>
      <p className="text-sm text-[var(--ink-muted)] mt-1.5 line-clamp-2">
        {clue.description}
      </p>
    </button>
  );
}