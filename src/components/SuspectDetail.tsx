"use client";

import { useState } from "react";
import { Suspect } from "@/types/case";
import ChatPanel from "@/components/ChatPanel";

interface Props {
  caseId: string;
  suspect: Suspect;
  onClose: () => void;
}

export default function SuspectDetail({ caseId, suspect, onClose }: Props) {
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-[var(--ink)]/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--surface-raised)] text-[var(--ink)] max-w-lg w-full rounded-[var(--radius-md)] border border-[var(--line)] p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[var(--ink-muted)] hover:text-[var(--ink)] text-sm">
          Close
        </button>

        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={suspect.avatar}
            alt={suspect.name}
            className="w-14 h-14 rounded-full object-cover border border-[var(--line)]"
          />
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              {suspect.name}
            </h2>
            <p className="text-sm text-[var(--ink-muted)]">
              {suspect.relation}
            </p>
          </div>
        </div>

        <button
          onClick={() => setNotesOpen((v) => !v)}
          className="mt-4 text-xs font-medium text-[var(--accent)]">
          {notesOpen ? "Hide case notes" : "Show case notes"}
        </button>

        {notesOpen && (
          <dl className="mt-2 space-y-3 text-sm bg-[var(--surface)] rounded-[var(--radius-sm)] p-3">
            <div>
              <dt className="text-xs font-medium text-[var(--ink-muted)]">
                Motive
              </dt>
              <dd className="mt-0.5">{suspect.motive}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-[var(--ink-muted)]">
                Alibi
              </dt>
              <dd className="mt-0.5">{suspect.alibi}</dd>
            </div>
          </dl>
        )}

        <div className="mt-4">
          <ChatPanel
            caseId={caseId}
            suspectId={suspect.id}
            suspectName={suspect.name}
            suggestedQuestions={[
              "Where were you when Edmund died?",
              "Did you argue with Edmund recently?",
              "Do you know anything about a burned receipt?",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
