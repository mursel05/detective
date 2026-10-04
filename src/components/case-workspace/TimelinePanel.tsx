import { TimelineEvent } from "@/types/case";

interface TimelinePanelProps {
  timeline: TimelineEvent[];
}

export default function TimelinePanel({ timeline }: TimelinePanelProps) {
  return (
    <ol className="space-y-4 border-l border-[var(--border)] pl-5">
      {timeline.map((event, index) => (
        <li key={index} className="relative">
          <span className="absolute -left-[26px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          <p className="text-xs font-medium text-[var(--accent)]">
            {event.time}
          </p>
          <p className="text-sm text-[var(--ink)] mt-0.5">
            {event.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
