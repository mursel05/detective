"use client";

import { useCallback, useEffect, useState } from "react";
import { CaseProgress } from "@/types/case";
import { loadProgress, saveProgress, resetProgress } from "@/lib/storage";

export function useGameProgress(caseId: string) {
  const [progress, setProgress] = useState<CaseProgress>(() =>
    loadProgress(caseId)
  );

  useEffect(() => {
    setProgress(loadProgress(caseId));
  }, [caseId]);

  const markIntroSeen = useCallback(() => {
    setProgress((prev) => {
      if (prev.introSeen) return prev;
      const next = { ...prev, introSeen: true };
      saveProgress(next);
      return next;
    });
  }, []);

  const markClueRead = useCallback((clueId: string) => {
    setProgress((prev) => {
      if (prev.readClueIds.includes(clueId)) return prev;
      const next = { ...prev, readClueIds: [...prev.readClueIds, clueId] };
      saveProgress(next);
      return next;
    });
  }, []);

  const markSuspectViewed = useCallback((suspectId: string) => {
    setProgress((prev) => {
      if (prev.viewedSuspectIds.includes(suspectId)) return prev;
      const next = {
        ...prev,
        viewedSuspectIds: [...prev.viewedSuspectIds, suspectId],
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const accuse = useCallback((suspectId: string, killerId: string) => {
    setProgress((prev) => {
      const next: CaseProgress = {
        ...prev,
        accusedId: suspectId,
        solved: true,
        correct: suspectId === killerId,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setProgress(resetProgress(caseId));
  }, [caseId]);

  return {
    progress,
    markIntroSeen,
    markClueRead,
    markSuspectViewed,
    accuse,
    reset,
  };
}