"use client";

import { useMemo, useState } from "react";
import caseData from "@/data/case-001.json";
import { Case } from "@/types/case";
import { useGameProgress } from "@/hooks/useGameProgress";
import SuspectFile from "@/components/SuspectFile";
import SuspectDetail from "@/components/SuspectDetail";
import ClueCard from "@/components/ClueCard";
import ClueDetail from "@/components/ClueDetail";
import AccusationPanel from "@/components/AccusationPanel";

type Tab = "suspects" | "evidence" | "accuse";

const CASE = caseData as Case;

export default function Home() {
  const [tab, setTab] = useState<Tab>("suspects");
  const [openSuspectId, setOpenSuspectId] = useState<string | null>(null);
  const [openClueId, setOpenClueId] = useState<string | null>(null);
  const {
    progress,
    markIntroSeen,
    markClueRead,
    markSuspectViewed,
    accuse,
    reset,
  } = useGameProgress(CASE.id);

  const openSuspect = useMemo(
    () => CASE.suspects.find((s) => s.id === openSuspectId) ?? null,
    [openSuspectId],
  );
  const openClue = useMemo(
    () => CASE.clues.find((c) => c.id === openClueId) ?? null,
    [openClueId],
  );

  if (!progress.introSeen) {
    return (
      <main className="min-h-screen bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[var(--surface-raised)] border border-[var(--line)] rounded-[var(--radius-md)] p-8">
          <p className="text-xs font-medium text-[var(--ink-muted)]">
            Case {CASE.id}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight mt-1">
            {CASE.title}
          </h1>
          <p className="text-sm text-[var(--ink-muted)] mt-4 leading-relaxed">
            {CASE.briefing}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-[var(--ink-muted)]">Victim</dt>
              <dd className="font-medium">{CASE.victim.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-[var(--ink-muted)]">Time of death</dt>
              <dd className="font-medium">{CASE.victim.timeOfDeath}</dd>
            </div>
          </dl>
          <button
            onClick={markIntroSeen}
            className="mt-6 w-full text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-4 py-2.5 hover:opacity-90 transition-opacity">
            Begin investigation
          </button>
        </div>
      </main>
    );
  }

  const navItems: [Tab, string, number][] = [
    ["suspects", "Suspects", CASE.suspects.length],
    ["evidence", "Evidence", CASE.clues.length],
    ["accuse", "Accuse", 0],
  ];

  return (
    <main className="min-h-screen bg-[var(--surface)] text-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <p className="text-xs font-medium text-[var(--ink-muted)]">
          Case {CASE.id}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight mt-1">
          {CASE.title}
        </h1>

        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            ["Victim", CASE.victim.name],
            ["Time of death", CASE.victim.timeOfDeath],
            ["Cause", CASE.victim.causeOfDeath],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-[var(--surface-raised)] border border-[var(--line)] rounded-[var(--radius-md)] px-4 py-3">
              <p className="text-xs text-[var(--ink-muted)]">{label}</p>
              <p className="text-sm font-medium mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-[160px_1fr] gap-6">
          <nav className="space-y-1">
            {navItems.map(([id, label, count]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`w-full flex items-center justify-between text-sm rounded-[var(--radius-sm)] px-3 py-2 transition-colors ${
                  tab === id
                    ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium"
                    : "text-[var(--ink-muted)] hover:bg-[var(--surface-raised)]"
                }`}>
                {label}
                {count > 0 && (
                  <span className="text-xs text-[var(--ink-muted)]">
                    {count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div>
            {tab === "suspects" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CASE.suspects.map((s) => (
                  <SuspectFile
                    key={s.id}
                    suspect={s}
                    viewed={progress.viewedSuspectIds.includes(s.id)}
                    onOpen={(id) => {
                      setOpenSuspectId(id);
                      markSuspectViewed(id);
                    }}
                  />
                ))}
              </div>
            )}

            {tab === "evidence" && (
              <div className="grid sm:grid-cols-2 gap-3">
                {CASE.clues.map((c) => (
                  <ClueCard
                    key={c.id}
                    clue={c}
                    read={progress.readClueIds.includes(c.id)}
                    onOpen={(id) => {
                      setOpenClueId(id);
                      markClueRead(id);
                    }}
                  />
                ))}
              </div>
            )}

            {tab === "accuse" && (
              <AccusationPanel
                caseData={CASE}
                accusedId={progress.accusedId}
                correct={progress.correct}
                solved={progress.solved}
                onAccuse={(id) => accuse(id, CASE.solution.killerId)}
                onReset={reset}
              />
            )}
          </div>
        </div>
      </div>

      {openSuspect && (
        <SuspectDetail
          caseId={CASE.id}
          suspect={openSuspect}
          onClose={() => setOpenSuspectId(null)}
        />
      )}
      {openClue && (
        <ClueDetail clue={openClue} onClose={() => setOpenClueId(null)} />
      )}
    </main>
  );
}
