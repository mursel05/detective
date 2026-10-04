"use client"
import { useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ProgressBar from "@/components/ui/ProgressBar";
import CaseSidebarNav, {
  WorkspaceTab,
} from "@/components/case-workspace/CaseSidebarNav";
import OverviewPanel from "@/components/case-workspace/OverviewPanel";
import SuspectsPanel from "@/components/case-workspace/SuspectsPanel";
import EvidencePanel from "@/components/case-workspace/EvidencePanel";
import TimelinePanel from "@/components/case-workspace/TimelinePanel";
import NotesPanel from "@/components/case-workspace/NotesPanel";
import AccusePanel from "@/components/case-workspace/AccusePanel";
import { getInvestigationById } from "@/data/investigations";

interface CaseWorkspaceProps {
  id: string;
}

export default function CaseWorkspace({ id }: CaseWorkspaceProps) {
  const router = useRouter();
  const [tab, setTab] = useState<WorkspaceTab>("overview");

  const caseDetail = getInvestigationById(id);
  if (!caseDetail) {
    notFound();
  }

  const sidebarItems = [
    { id: "overview" as const, label: "Case File", icon: "📁" },
    {
      id: "suspects" as const,
      label: "Suspects",
      icon: "👥",
      count: caseDetail.suspects.length,
    },
    {
      id: "evidence" as const,
      label: "Evidence",
      icon: "🔍",
      count: caseDetail.evidence.length,
    },
    {
      id: "timeline" as const,
      label: "Timeline",
      icon: "🕐",
      count: caseDetail.timeline.length,
    },
    {
      id: "notes" as const,
      label: "Notes",
      icon: "📝",
      count: caseDetail.notes.length,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={caseDetail.coverImage}
            alt={caseDetail.title}
            className="w-14 h-14 rounded-[var(--radius-sm)] object-cover border border-[var(--border)]"
          />
          <div className="flex-1">
            <p className="text-xs text-[var(--accent)]">
              {caseDetail.caseNumber}
            </p>
            <h1 className="font-heading text-2xl font-semibold text-[var(--ink)]">
              {caseDetail.title}
            </h1>
            <ProgressBar percent={0} className="mt-2 max-w-xs" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-[180px_1fr] gap-6">
          <div className="flex flex-col justify-between">
            <CaseSidebarNav
              items={sidebarItems}
              active={tab}
              onChange={setTab}
            />
            <button
              onClick={() => setTab("accuse")}
              className="mt-6 text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-4 py-2.5 hover:opacity-90 transition-opacity">
              ⚖️ Accuse Murderer
            </button>
          </div>

          <div>
            {tab === "overview" && <OverviewPanel caseDetail={caseDetail} />}
            {tab === "suspects" && (
              <SuspectsPanel
                suspects={caseDetail.suspects}
                onSelect={(suspectId) =>
                  router.push(
                    `/investigations/${caseDetail.id}/case/suspects/${suspectId}`,
                  )
                }
              />
            )}
            {tab === "evidence" && (
              <EvidencePanel evidence={caseDetail.evidence} />
            )}
            {tab === "timeline" && (
              <TimelinePanel timeline={caseDetail.timeline} />
            )}
            {tab === "notes" && <NotesPanel notes={caseDetail.notes} />}
            {tab === "accuse" && <AccusePanel caseDetail={caseDetail} />}
          </div>
        </div>
      </main>
    </div>
  );
}
