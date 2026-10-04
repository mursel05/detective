interface TypingIndicatorProps {
  name: string;
}

export default function TypingIndicator({ name }: TypingIndicatorProps) {
  return (
    <div className="flex justify-start">
      <div className="bg-[var(--surface-raised)] text-[var(--ink-muted)] text-sm rounded-[var(--radius-sm)] px-3 py-2">
        {name} is thinking
        <span className="inline-flex ml-1 gap-0.5 align-middle">
          <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce [animation-delay:-0.2s]" />
          <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce [animation-delay:-0.1s]" />
          <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce" />
        </span>
      </div>
    </div>
  );
}