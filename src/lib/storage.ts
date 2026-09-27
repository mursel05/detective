import { CaseProgress } from "@/types/case";

const KEY_PREFIX = "detective:progress:";

export function loadProgress(caseId: string): CaseProgress {
  if (typeof window === "undefined") {
    return emptyProgress(caseId);
  }
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + caseId);
    if (!raw) return emptyProgress(caseId);
    return { ...emptyProgress(caseId), ...JSON.parse(raw) } as CaseProgress;
  } catch {
    return emptyProgress(caseId);
  }
}

export function saveProgress(progress: CaseProgress): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY_PREFIX + progress.caseId,
    JSON.stringify(progress)
  );
}

export function resetProgress(caseId: string): CaseProgress {
  const fresh = emptyProgress(caseId);
  saveProgress(fresh);
  return fresh;
}

function emptyProgress(caseId: string): CaseProgress {
  return {
    caseId,
    introSeen: false,
    readClueIds: [],
    viewedSuspectIds: [],
    accusedId: null,
    solved: false,
    correct: null,
  };
}