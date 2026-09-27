"use client";

import { Clue } from "@/types/case";

interface Props {
  clue: Clue;
  onClose: () => void;
}

export default function ClueDetail({ clue, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-[var(--ink)]/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--surface-raised)] text-[var(--ink)] max-w-md w-full rounded-[var(--radius-md)] border border-[var(--line)] p-6 relative shadow-xl">
        <button
          onClick={onClose}
          aria-label="Close exhibit"
          className="absolute top-4 right-4 text-[var(--ink-muted)] hover:text-[var(--ink)] text-sm"
        >
          Close
        </button>
        <span className="inline-block text-[11px] font-medium text-[var(--accent)] bg-[var(--accent-soft)] rounded-full px-2 py-0.5">
          Evidence
        </span>
        <h2 className="text-xl font-semibold tracking-tight mt-3">
          {clue.title}
        </h2>
        <p className="text-sm mt-3 leading-relaxed text-[var(--ink)]/90">
          {clue.description}
        </p>
      </div>
    </div>
  );
}