import { Investigation } from "@/types/investigation";
import InvestigationCard from "@/components/investigations/InvestigationCard";

interface InvestigationsGridProps {
  investigations: Investigation[];
}

export default function InvestigationsGrid({
  investigations,
}: InvestigationsGridProps) {
  if (investigations.length === 0) {
    return (
      <p className="text-sm text-[var(--ink-muted)] mt-10 text-center">
        No cases match your search.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
      {investigations.map((investigation) => (
        <InvestigationCard key={investigation.id} investigation={investigation} />
      ))}
    </div>
  );
}