export interface Suspect {
  id: string;
  name: string;
  relation: string;
  avatar: string;
  motive: string;
  alibi: string;
  statement: string;
}

export interface Clue {
  id: string;
  title: string;
  description: string;
  pointsTo: string[];
  redHerring?: boolean;
}

export interface Victim {
  name: string;
  occupation: string;
  causeOfDeath: string;
  timeOfDeath: string;
  location: string;
}

export interface Solution {
  killerId: string;
  explanation: string;
}

export interface Case {
  id: string;
  title: string;
  victim: Victim;
  briefing: string;
  suspects: Suspect[];
  clues: Clue[];
  solution: Solution;
}

export interface CaseProgress {
  caseId: string;
  introSeen: boolean;
  readClueIds: string[];
  viewedSuspectIds: string[];
  accusedId: string | null;
  solved: boolean;
  correct: boolean | null;
}