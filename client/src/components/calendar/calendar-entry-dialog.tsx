"use client";

import { useState } from "react";
import { useRecipes } from "@/lib/hooks/use-recipes";
import { useCreateCalendarEntry, useDeleteCalendarEntry } from "@/lib/hooks/use-calendar";
import { Trash2, X } from "lucide-react";
import { formatDisplayDate } from "@/lib/utils/format";
import type { CalendarEntry } from "@/lib/types/calendar.types";

interface CalendarEntryDialogProps {
  petId: string;
  date: string;
  existingEntries: CalendarEntry[];
  onClose: () => void;
}

export function CalendarEntryDialog({ petId, date, existingEntries, onClose }: CalendarEntryDialogProps) {
  const { data: recipes } = useRecipes(petId);
  const createEntry = useCreateCalendarEntry();
  const deleteEntry = useDeleteCalendarEntry();
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [mealType, setMealType] = useState("breakfast");

  const handleAdd = async () => {
    if (!selectedRecipeId) return;
    await createEntry.mutateAsync({ petId, recipeId: selectedRecipeId, date, mealType });
    setSelectedRecipeId("");
  };

  const selectClass = "rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-50 mx-4 w-full max-w-md rounded-xl border bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between pb-4">
          <h2 className="font-semibold">{formatDisplayDate(new Date(date + "T00:00:00"))}</h2>
          <button onClick={onClose} className="rounded-md p-1 hover:bg-accent"><X className="size-4" /></button>
        </div>

        {existingEntries.length > 0 && (
          <div className="mb-4 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">Scheduled Meals</h3>
            {existingEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-lg border p-2.5">
                <div>
                  <p className="text-sm font-medium">{entry.recipeTitle || "Recipe"}</p>
                  <p className="text-xs text-muted-foreground capitalize">{entry.mealType}</p>
                </div>
                <button
                  onClick={() => deleteEntry.mutateAsync(entry.id)}
                  className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t pt-4">
          <h3 className="text-sm font-medium">Add Meal</h3>
          <select value={selectedRecipeId} onChange={(e) => setSelectedRecipeId(e.target.value)} className={selectClass}>
            <option value="">Select a recipe...</option>
            {recipes?.map((r) => (
              <option key={r.id} value={r.id}>{r.title}</option>
            ))}
          </select>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)} className={selectClass}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedRecipeId || createEntry.isPending}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {createEntry.isPending ? "Adding..." : "Add to Calendar"}
          </button>
        </div>
      </div>
    </div>
  );
}
