import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import CoverPhoto from "@/components/case-intro/CoverPhoto";
import VictimCard from "@/components/case-intro/VictimCard";
import EvidencePreviewList from "@/components/case-intro/EvidencePreviewList";
import ObjectiveNote from "@/components/case-intro/ObjectiveNote";
import { getInvestigationById } from "@/data/investigations";

interface CaseIntroPageProps {
  params: Promise<{ id: string }>;
}

export default async function CaseIntroPage({ params }: CaseIntroPageProps) {
  const { id } = await params;
  const caseDetail = getInvestigationById(id);

  if (!caseDetail) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
        <CoverPhoto
          src={caseDetail.coverImage}
          alt={caseDetail.title}
          caption={`${caseDetail.location} — ${caseDetail.date}`}
        />

        <div>
          <p className="text-xs font-medium text-[var(--accent)] tracking-wide">
            {caseDetail.caseNumber}
          </p>
          <h1 className="font-heading text-4xl font-semibold text-[var(--ink)] mt-1">
            {caseDetail.title}
          </h1>

          <div className="flex items-center gap-3 mt-3 text-sm text-[var(--ink-muted)]">
            <span>📍 {caseDetail.location}</span>
            <span>📅 {caseDetail.date}</span>
            <DifficultyBadge difficulty={caseDetail.difficulty} />
          </div>

          <p className="text-sm text-[var(--ink-muted)] leading-relaxed mt-5">
            {caseDetail.briefing}
          </p>

          <div className="mt-5">
            <VictimCard victim={caseDetail.victim} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            <EvidencePreviewList evidence={caseDetail.evidence} />
            <ObjectiveNote objective={caseDetail.objective} />
          </div>

          <Link
            href={`/investigations/${caseDetail.id}/case`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-5 py-2.5 hover:opacity-90 transition-opacity">
            Begin Investigation →
          </Link>
        </div>
      </main>
    </div>
  );
}
