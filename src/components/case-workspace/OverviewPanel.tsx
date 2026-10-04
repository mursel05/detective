import { CaseDetail } from "@/types/case";

interface OverviewPanelProps {
  caseDetail: CaseDetail;
}

export default function OverviewPanel({ caseDetail }: OverviewPanelProps) {
  return (
    <div>
      <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
        {caseDetail.briefing}
      </p>
      <div className="mt-5 rounded-[var(--radius-md)] overflow-hidden border border-[var(--border)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={caseDetail.coverImage}
          alt={caseDetail.title}
          className="w-full h-56 object-cover"
        />
      </div>
    </div>
  );
}
