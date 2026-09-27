"use client";

import { useState } from "react";
import { Case } from "@/types/case";

interface Props {
  caseData: Case;
  accusedId: string | null;
  correct: boolean | null;
  solved: boolean;
  onAccuse: (suspectId: string) => void;
  onReset: () => void;
}

export default function AccusationPanel({
  caseData,
  accusedId,
  correct,
  solved,
  onAccuse,
  onReset,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  if (solved) {
    const accused = caseData.suspects.find((s) => s.id === accusedId);
    const killer = caseData.suspects.find(
      (s) => s.id === caseData.solution.killerId
    );

    return (
      <div
        className="rounded-[var(--radius-md)] border p-6"
        style={{
          borderColor: correct ? "var(--success)" : "var(--danger)",
          background: correct ? "#eafaf3" : "var(--danger-soft)",
        }}
      >
        <p
          className="text-xs font-medium"
          style={{ color: correct ? "var(--success)" : "var(--danger)" }}
        >
          Verdict
        </p>
        <h2 className="text-xl font-semibold tracking-tight mt-1 text-[var(--ink)]">
          {correct ? "Case closed." : "Wrong call."}
        </h2>
        <p className="text-sm mt-3 text-[var(--ink)]">
          You accused <strong>{accused?.name}</strong>.{" "}
          {correct
            ? "The evidence held up."
            : `The killer was actually ${killer?.name}.`}
        </p>
        <p className="text-sm mt-3 leading-relaxed text-[var(--ink-muted)]">
          {caseData.solution.explanation}
        </p>
        <button
          onClick={onReset}
          className="mt-5 text-sm font-medium border border-[var(--line)] rounded-[var(--radius-sm)] px-4 py-2 hover:bg-[var(--surface)] transition-colors text-[var(--ink)]"
        >
          Restart case
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface-raised)] border border-[var(--line)] rounded-[var(--radius-md)] p-6">
      <p className="text-xs font-medium text-[var(--ink-muted)]">
        Final step
      </p>
      <h2 className="text-xl font-semibold tracking-tight mt-1 text-[var(--ink)]">
        Who murdered {caseData.victim.name}?
      </h2>
      <div className="mt-4 space-y-2">
        {caseData.suspects.map((s) => (
          <label
            key={s.id}
            className={`flex items-center gap-3 text-sm rounded-[var(--radius-sm)] border px-3 py-2.5 cursor-pointer transition-colors ${
              selected === s.id
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--line)] hover:border-[var(--accent)]"
            }`}
          >
            <input
              type="radio"
              name="accusation"
              checked={selected === s.id}
              onChange={() => setSelected(s.id)}
              className="accent-[var(--accent)]"
            />
            <span className="text-[var(--ink)]">{s.name}</span>
          </label>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() => selected && onAccuse(selected)}
        className="mt-5 text-sm font-medium bg-[var(--danger)] text-white rounded-[var(--radius-sm)] px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
      >
        Make accusation
      </button>
    </div>
  );
}