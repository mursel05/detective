import { Difficulty } from "@/types/investigation";

export interface CaseVictim {
  name: string;
  age: number;
  occupation: string;
  photo: string;
}

export interface SuspectSecret {
  fact: string;
  revealCondition: string;
}

export interface CaseSuspect {
  id: string;
  name: string;
  age: number;
  role: string;
  avatar: string;
  persona: string;
  knownFacts: string[];
  secrets: SuspectSecret[];
  isKiller?: boolean;
  crackClueIds: string[];
  crackBehavior: string;
}

export interface CaseEvidenceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  thumbnail: string;
}

export interface TimelineEvent {
  time: string;
  description: string;
}

export interface CaseSolution {
  killerId: string;
  explanation: string;
}

export interface CaseDetail {
  id: string;
  caseNumber: string;
  title: string;
  location: string;
  date: string;
  difficulty: Difficulty;
  coverImage: string;
  victim: CaseVictim;
  briefing: string;
  objective: string;
  suspects: CaseSuspect[];
  evidence: CaseEvidenceItem[];
  timeline: TimelineEvent[];
  notes: string[];
  solution: CaseSolution;
}
