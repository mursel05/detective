"use client";
import { useCallback, useEffect, useState } from "react";

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  mood?: string;
}

const KEY_PREFIX = "detective:chat:";

export function useSuspectChat(caseId: string, suspectId: string) {
  const storageKey = `${KEY_PREFIX}${caseId}:${suspectId}`;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      setMessages(raw ? JSON.parse(raw) : []);
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  const persist = useCallback(
    (next: ChatMessage[]) => {
      setMessages(next);
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    },
    [storageKey],
  );

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const withUserMsg = [
        ...messages,
        { role: "user", text: trimmed } as ChatMessage,
      ];
      persist(withUserMsg);
      setPending(true);

      try {
        const res = await fetch("/api/interrogate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            suspectId,
            message: trimmed,
            history: withUserMsg
              .slice(0, -1)
              .map((m) => ({ role: m.role, text: m.text })),
          }),
        });
        const data = await res.json();
        persist([
          ...withUserMsg,
          {
            role: "model",
            text: data.reply ?? "...",
            mood: data.mood ?? "calm",
          },
        ]);
      } catch {
        persist([...withUserMsg, { role: "model", text: "...", mood: "calm" }]);
      } finally {
        setPending(false);
      }
    },
    [messages, persist, suspectId],
  );

  return { messages, send, pending };
}
