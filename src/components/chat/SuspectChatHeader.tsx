import Link from "next/link";
import { CaseSuspect } from "@/types/case";

interface SuspectChatHeaderProps {
  caseId: string;
  suspect: CaseSuspect;
  moodColor?: string;
}

export default function SuspectChatHeader({
  caseId,
  suspect,
  moodColor,
}: SuspectChatHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={suspect.avatar}
            alt={suspect.name}
            className="w-11 h-11 rounded-full object-cover border border-[var(--border)]"
          />
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[var(--surface)]"
            style={{ background: moodColor ?? "var(--easy)" }}
          />
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">
            {suspect.name}
          </p>
          <p className="text-xs text-[var(--ink-muted)]">
            {suspect.age} years old · {suspect.role}
          </p>
        </div>
      </div>
      <Link
        href={`/investigations/${caseId}/case`}
        className="text-[var(--ink-muted)] hover:text-[var(--ink)] text-sm"
        aria-label="Back to case file">
        ✕
      </Link>
    </div>
  );
}
