"use client";
import { useState } from "react";
import { useSuspectChat } from "@/hooks/useSuspectChat";

interface Props {
  caseId: string;
  suspectId: string;
  suspectName: string;
  suggestedQuestions?: string[];
}

const MOOD_COLOR: Record<string, string> = {
  calm: "var(--success)",
  nervous: "var(--warning)",
  defensive: "var(--ink-muted)",
  hostile: "var(--danger)",
  shaken: "var(--danger)",
};

export default function ChatPanel({
  caseId,
  suspectId,
  suspectName,
  suggestedQuestions = [],
}: Props) {
  const { messages, send, pending } = useSuspectChat(caseId, suspectId);
  const [input, setInput] = useState("");

  const lastMood = [...messages].reverse().find((m) => m.mood)?.mood;

  const handleSend = (text: string) => {
    if (pending) return;
    send(text);
    setInput("");
  };

  return (
    <div className="border border-[var(--line)] rounded-[var(--radius-md)] bg-[var(--surface-raised)] flex flex-col h-[420px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--line)]">
        <span
          className="w-2 h-2 rounded-full"
          style={{
            background: lastMood ? MOOD_COLOR[lastMood] : "var(--line)",
          }}
        />
        <p className="text-sm font-medium text-[var(--ink)]">
          Interviewing {suspectName}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-[var(--ink-muted)]">
            Ask {suspectName} about the night of the murder.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] text-sm rounded-[var(--radius-sm)] px-3 py-2 ${
                m.role === "user"
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--surface)] text-[var(--ink)]"
              }`}>
              {m.text}
            </div>
          </div>
        ))}
        {pending && (
          <div className="flex justify-start">
            <div className="bg-[var(--surface)] text-[var(--ink-muted)] text-sm rounded-[var(--radius-sm)] px-3 py-2">
              {suspectName} is thinking
              <span className="inline-flex ml-1 gap-0.5 align-middle">
                <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1 h-1 rounded-full bg-[var(--ink-muted)] animate-bounce" />
              </span>
            </div>
          </div>
        )}
      </div>

      {suggestedQuestions.length > 0 && (
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto">
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              disabled={pending}
              className="shrink-0 text-xs border border-[var(--line)] rounded-full px-3 py-1.5 text-[var(--ink-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors disabled:opacity-40">
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2 p-3 border-t border-[var(--line)]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Ask a question…"
          className="flex-1 text-sm border border-[var(--line)] rounded-[var(--radius-sm)] px-3 py-2 outline-none focus:border-[var(--accent)] text-[var(--ink)]"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={pending || !input.trim()}
          className="text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-4 disabled:opacity-40">
          Ask
        </button>
      </div>
    </div>
  );
}
