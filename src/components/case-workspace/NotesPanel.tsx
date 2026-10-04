interface NotesPanelProps {
  notes: string[];
}

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <ul className="space-y-3">
      {notes.map((note, index) => (
        <li
          key={index}
          className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] p-3 text-sm text-[var(--ink)]"
        >
          {note}
        </li>
      ))}
    </ul>
  );
}