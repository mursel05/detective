import { Difficulty } from "@/types/investigation";
import { DIFFICULTY_STYLES } from "@/lib/difficulty";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  const style = DIFFICULTY_STYLES[difficulty];

  return (
    <span
      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
      style={{ background: style.bg, color: style.text }}
    >
      {difficulty}
    </span>
  );
}