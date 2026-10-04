import { CaseEvidenceItem } from "@/types/case";

interface EvidencePreviewListProps {
  evidence: CaseEvidenceItem[];
}

export default function EvidencePreviewList({
  evidence,
}: EvidencePreviewListProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-4">
      <p className="text-xs font-medium text-[var(--ink-muted)] uppercase tracking-wide">
        Known Evidence
      </p>
      <ul className="mt-3 space-y-2">
        {evidence.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-2 text-sm text-[var(--ink)]">
            <span aria-hidden>{item.icon}</span>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
