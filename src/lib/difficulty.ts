import { Difficulty } from "@/types/investigation";

export const DIFFICULTY_STYLES: Record<
  Difficulty,
  { bg: string; text: string }
> = {
  Easy: { bg: "var(--easy-soft)", text: "var(--easy)" },
  Medium: { bg: "var(--medium-soft)", text: "var(--medium)" },
  Hard: { bg: "var(--hard-soft)", text: "var(--hard)" },
};

export const DIFFICULTY_FILTERS = ["All", "Easy", "Medium", "Hard"] as const;
export type FilterValue = (typeof DIFFICULTY_FILTERS)[number];