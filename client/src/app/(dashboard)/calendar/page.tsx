"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarEntryDialog } from "@/components/calendar/calendar-entry-dialog";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import type { CalendarEntry } from "@/lib/types/calendar.types";

export default function CalendarPage() {
  const { data: pets, isLoading } = usePets();
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [dialogState, setDialogState] = useState<{
    date: string;
    entries: CalendarEntry[];
  } | null>(null);

  const activePetId = selectedPetId || pets?.[0]?.id || "";

  if (isLoading) return <LoadingSpinner message="Loading..." />;

  if (!pets || pets.length === 0) {
    return (
      <div>
        <PageHeader title="Calendar" description="Plan your pet's meals" />
        <EmptyState icon={CalendarIcon} title="No pets yet" description="Add a pet first to start meal planning" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Calendar" description="Plan your pet's meals by day" />

      <div className="mb-4 flex flex-wrap gap-2">
        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => setSelectedPetId(pet.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              activePetId === pet.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {pet.name}
          </button>
        ))}
      </div>

      {activePetId && (
        <CalendarGrid
          petId={activePetId}
          onDayClick={(date, entries) => setDialogState({ date, entries })}
        />
      )}

      {dialogState && (
        <CalendarEntryDialog
          petId={activePetId}
          date={dialogState.date}
          existingEntries={dialogState.entries}
          onClose={() => setDialogState(null)}
        />
      )}
    </div>
  );
}
