"use client";

import { useState } from "react";

interface ChatComposerProps {
  disabled: boolean;
  onSend: (text: string) => void;
}

export default function ChatComposer({ disabled, onSend }: ChatComposerProps) {
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (disabled) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <div className="flex gap-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
        placeholder="Type your message..."
        aria-label="Message"
        className="flex-1 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] px-3 py-2 outline-none focus:border-[var(--accent)] text-[var(--ink)]"
      />
      <button
        onClick={() => handleSend(input)}
        disabled={disabled || !input.trim()}
        className="text-sm font-medium bg-[var(--accent)] text-white rounded-[var(--radius-sm)] px-4 disabled:opacity-40">
        Send
      </button>
    </div>
  );
}
