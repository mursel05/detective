import { ChatMessage } from "@/hooks/useSuspectChat";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export default function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] text-sm rounded-[var(--radius-sm)] px-3 py-2 ${
          isUser
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--surface-raised)] text-[var(--ink)]"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}