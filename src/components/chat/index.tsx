"use client";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import SuspectChatHeader from "@/components/chat/SuspectChatHeader";
import ChatPanel from "@/components/chat/ChatPanel";
import { useSuspectChat } from "@/hooks/useSuspectChat";
import { getInvestigationById } from "@/data/investigations";

const MOOD_COLOR: Record<string, string> = {
  calm: "var(--easy)",
  nervous: "var(--medium)",
  defensive: "var(--ink-muted)",
  hostile: "var(--accent)",
  shaken: "var(--accent)",
};

interface SuspectChatProps {
  id: string;
  suspectId: string;
}

export default function SuspectChat({ id, suspectId }: SuspectChatProps) {
  const caseDetail = getInvestigationById(id);
  if (!caseDetail) {
    notFound();
  }

  const suspect = caseDetail.suspects.find((s) => s.id === suspectId);
  if (!suspect) {
    notFound();
  }

  const { messages, send, pending } = useSuspectChat(caseDetail.id, suspect.id);
  const lastMood = [...messages].reverse().find((m) => m.mood)?.mood;

  return (
    <div className="h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />
      <main className="flex-1 min-h-0 max-w-2xl w-full mx-auto px-6 py-6 flex flex-col gap-3">
        <div className="shrink-0">
          <SuspectChatHeader
            caseId={caseDetail.id}
            suspect={suspect}
            moodColor={lastMood ? MOOD_COLOR[lastMood] : undefined}
          />
        </div>
        <div className="flex-1 min-h-0">
          <ChatPanel
            messages={messages}
            pending={pending}
            suspectName={suspect.name}
            onSend={send}
          />
        </div>
      </main>
    </div>
  );
}