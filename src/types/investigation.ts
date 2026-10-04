import {
  CaseEvidenceItem,
  CaseSolution,
  CaseSuspect,
  CaseVictim,
  TimelineEvent,
} from "./case";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Investigation {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  date: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  progressPercent: number;
  coverImage: string;
  isNew?: boolean;
  victim: CaseVictim;
  briefing: string;
  objective: string;
  suspects: CaseSuspect[];
  evidence: CaseEvidenceItem[];
  timeline: TimelineEvent[];
  notes: string[];
  solution: CaseSolution;
}
