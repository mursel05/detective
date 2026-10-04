import Link from "next/link";
import { Investigation } from "@/types/investigation";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import ProgressBar from "@/components/ui/ProgressBar";

interface InvestigationCardProps {
  investigation: Investigation;
}

export default function InvestigationCard({
  investigation,
}: InvestigationCardProps) {
  return (
    <Link
      href={`/investigations/${investigation.id}`}
      className="group block bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] overflow-hidden hover:border-[var(--accent)] transition-colors"
    >
      <div className="relative h-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={investigation.coverImage}
          alt={investigation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3">
          <DifficultyBadge difficulty={investigation.difficulty} />
        </div>
        {investigation.isNew && (
          <span className="absolute top-3 right-3 text-[10px] font-medium bg-[var(--accent)] text-white px-2 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
          {investigation.title}
        </h3>
        <p className="text-xs text-[var(--ink-muted)] mt-1">
          {investigation.location}, {investigation.date}
        </p>

        <div className="flex items-center justify-between mt-3 text-xs text-[var(--ink-muted)]">
          <span>~ {investigation.estimatedMinutes} min</span>
          <span>{investigation.progressPercent}%</span>
        </div>
        <ProgressBar percent={investigation.progressPercent} className="mt-2" />
      </div>
    </Link>
  );
}