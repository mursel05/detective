"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/hooks/useSuspectChat";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatComposer from "@/components/chat/ChatComposer";

interface ChatPanelProps {
  messages: ChatMessage[];
  pending: boolean;
  suspectName: string;
  suggestedQuestions?: string[];
  onSend: (text: string) => void;
}

export default function ChatPanel({
  messages,
  pending,
  suspectName,
  suggestedQuestions = [],
  onSend,
}: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  return (
    <div className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)]">
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-[var(--ink-muted)]">
            Ask {suspectName} about the night of the murder.
          </p>
        )}
        {messages.map((message, index) => (
          <ChatMessageBubble key={index} message={message} />
        ))}
        {pending && <TypingIndicator name={suspectName} />}
        <div ref={bottomRef} />
      </div>
      <div className="shrink-0 border-t border-[var(--border)] p-3">
        <ChatComposer
          disabled={pending}
          suggestedQuestions={suggestedQuestions}
          onSend={onSend}
        />
      </div>
    </div>
  );
}