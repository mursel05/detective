"use client";

import { useState } from "react";
import { CaseDetail } from "@/types/case";

interface AccusePanelProps {
  caseDetail: CaseDetail;
}

export default function AccusePanel({ caseDetail }: AccusePanelProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<"correct" | "incorrect" | null>(null);

  if (verdict) {
    const correct = verdict === "correct";
    const killer = caseDetail.suspects.find(
      (s) => s.id === caseDetail.solution.killerId,
    );

    return (
      <div
        className="rounded-[var(--radius-md)] border p-6"
        style={{
          borderColor: correct ? "var(--easy)" : "var(--accent)",
          background: correct ? "var(--easy-soft)" : "var(--accent-soft)",
        }}>
        <p
          className="text-xs font-medium"
          style={{ color: correct ? "var(--easy)" : "var(--accent)" }}>
          Verdict
        </p>
        <h2 className="font-heading text-2xl font-semibold text-[var(--ink)] mt-1">
          {correct ? "Case closed." : "Wrong call."}
        </h2>
        <p className="text-sm text-[var(--ink)] mt-3">
          {correct
            ? "The evidence held up."
            : `The killer was actually ${killer?.name}.`}
        </p>
        <p className="text-sm text-[var(--ink-muted)] mt-3 leading-relaxed">
          {caseDetail.solution.explanation}
        </p>
        <button
          onClick={() => {
            setSelected(null);
            setVerdict(null);
          }}
          className="mt-5 text-sm font-medium border border-[var(--border)] rounded-[var(--radius-sm)] px-4 py-2 hover:bg-[var(--surface)] transition-colors text-[var(--ink)]">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-6">
      <h2 className="font-heading text-2xl font-semibold text-[var(--ink)]">
        Who murdered {caseDetail.victim.name}?
      </h2>
      <div className="mt-4 space-y-2">
        {caseDetail.suspects.map((suspect) => (
          <label
            key={suspect.id}
            className={`flex items-center gap-3 text-sm rounded-[var(--radius-sm)] border px-3 py-2.5 cursor-pointer transition-colors ${
              selected === suspect.id
                ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                : "border-[var(--border)] hover:border-[var(--accent)]"
            }`}>
            <input
              type="radio"
              name="accusation"
              checked={selected === suspect.id}
              onChange={() => setSelected(suspect.id)}
              className="accent-[var(--accent)]"
            />
            <span className="text-[var(--ink)]">{suspect.name}</span>
          </label>
        ))}
      </div>
      <button
        disabled={!selected}
        onClick={() =>
          setVerdict(
            selected === caseDetail.solution.killerId ? "correct" : "incorrect",
          )
        }
        className="mt-5 text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-4 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
        Make accusation
      </button>
    </div>
  );
}
