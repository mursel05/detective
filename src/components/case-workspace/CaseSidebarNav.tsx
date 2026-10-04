export type WorkspaceTab =
  | "overview"
  | "suspects"
  | "evidence"
  | "timeline"
  | "notes"
  | "accuse";

interface SidebarItem {
  id: WorkspaceTab;
  label: string;
  icon: string;
  count?: number;
}

interface CaseSidebarNavProps {
  items: SidebarItem[];
  active: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
}

export default function CaseSidebarNav({ items, active, onChange }: CaseSidebarNavProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`w-full flex items-center justify-between text-sm rounded-[var(--radius-sm)] px-3 py-2 transition-colors ${
            active === item.id
              ? "bg-[var(--accent-soft)] text-[var(--accent)] font-medium"
              : "text-[var(--ink-muted)] hover:bg-[var(--surface)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </span>
          {typeof item.count === "number" && (
            <span className="text-xs text-[var(--ink-muted)]">{item.count}</span>
          )}
        </button>
      ))}
    </nav>
  );
}