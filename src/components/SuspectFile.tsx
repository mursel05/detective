"use client";

import { Suspect } from "@/types/case";

interface Props {
  suspect: Suspect;
  viewed: boolean;
  onOpen: (id: string) => void;
}

export default function SuspectFile({ suspect, viewed, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(suspect.id)}
      className="relative flex flex-col items-center text-center bg-[var(--surface-raised)] border border-[var(--line)] rounded-[var(--radius-md)] p-4 hover:border-[var(--accent)] transition-colors"
    >
      {viewed && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--success)]" />
      )}
      <div className="w-20 h-20 rounded-full overflow-hidden border border-[var(--line)] bg-[var(--surface)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={suspect.avatar}
          alt={suspect.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold text-sm text-[var(--ink)] mt-3 tracking-tight">
        {suspect.name}
      </h3>
      <p className="text-xs text-[var(--ink-muted)] mt-0.5">
        {suspect.relation}
      </p>
    </button>
  );
}