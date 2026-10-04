"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/investigations/SearchBar";
import DifficultyFilter from "@/components/investigations/DifficultyFilter";
import InvestigationsGrid from "@/components/investigations/InvestigationsGrid";
import { getInvestigations } from "@/data/investigations";
import { DIFFICULTY_FILTERS, FilterValue } from "@/lib/difficulty";

export default function InvestigationsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("All");

  const investigations = getInvestigations();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return investigations.filter((investigation) => {
      const matchesFilter = filter === "All" || investigation.difficulty === filter;
      const matchesSearch = investigation.title.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [investigations, filter, search]);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-[var(--ink)]">
              Available Investigations
            </h1>
            <p className="text-sm text-[var(--ink-muted)] mt-1">
              Choose a case and put your detective skills to the test.
            </p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mt-6">
          <DifficultyFilter
            options={DIFFICULTY_FILTERS}
            active={filter}
            onChange={setFilter}
          />
        </div>

        <InvestigationsGrid investigations={filtered} />
      </main>
    </div>
  );
}