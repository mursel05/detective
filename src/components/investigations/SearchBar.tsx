interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 w-full sm:w-64">
      <span className="text-[var(--ink-muted)] text-sm" aria-hidden>
        🔍
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cases..."
        aria-label="Search cases"
        className="bg-transparent text-sm text-[var(--ink)] placeholder:text-[var(--ink-muted)] outline-none w-full"
      />
    </div>
  );
}