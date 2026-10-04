import { FilterValue } from "@/lib/difficulty";

interface DifficultyFilterProps {
  options: readonly FilterValue[];
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

export default function DifficultyFilter({
  options,
  active,
  onChange,
}: DifficultyFilterProps) {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
            active === option
              ? "bg-[var(--accent)] border-[var(--accent)] text-white"
              : "border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}