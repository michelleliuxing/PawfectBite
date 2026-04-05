"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { useRecipes } from "@/lib/hooks/use-recipes";
import { useCreateCalendarEntry, useDeleteCalendarEntry } from "@/lib/hooks/use-calendar";
import { formatDisplayDate } from "@/lib/utils/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{formatDisplayDate(new Date(date + "T00:00:00"))}</DialogTitle>
        </DialogHeader>

        {existingEntries.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">Scheduled Meals</h3>
            {existingEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-lg border p-2.5">
                <div>
                  <p className="text-sm font-medium">{entry.recipeTitle || "Recipe"}</p>
                  <p className="text-xs capitalize text-muted-foreground">{entry.mealType}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-destructive"
                  onClick={() => deleteEntry.mutateAsync(entry.id)}
                >
                  <Trash2Icon className="size-3.5" />
                </Button>
              </div>
            ))}
            <Separator />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium">Add Meal</h3>
          <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a recipe..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {recipes?.map((r) => (
                  <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAdd}
            disabled={!selectedRecipeId || createEntry.isPending}
          >
            {createEntry.isPending ? "Adding..." : "Add to Calendar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
