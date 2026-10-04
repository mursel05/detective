import { CaseEvidenceItem } from "@/types/case";

interface EvidencePanelProps {
  evidence: CaseEvidenceItem[];
}

export default function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {evidence.map((item) => (
        <div
          key={item.id}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] p-4">
          <div className="flex items-center gap-2">
            <span aria-hidden>{item.icon}</span>
            <h3 className="font-semibold text-sm text-[var(--ink)]">
              {item.title}
            </h3>
          </div>
          <p className="text-sm text-[var(--ink-muted)] mt-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
