"use client";

import { useState } from "react";
import { Trash2Icon } from "lucide-react";
import { motion } from "framer-motion";
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
          <div className="flex flex-col gap-2 mt-4">
            <h3 className="text-lg font-black text-[#4A3B32]">Scheduled Meals</h3>
            {existingEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-2xl border-4 border-[#4A3B32] p-4 bg-[#FFF9F2] shadow-[4px_4px_0px_#4A3B32]">
                <div>
                  <p className="text-lg font-bold text-[#4A3B32]">{entry.recipeTitle || "Recipe"}</p>
                  <p className="text-sm capitalize font-bold text-[#4A3B32]/70">{entry.mealType}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border-4 border-[#4A3B32] bg-[#F7B2B7] flex items-center justify-center text-white shadow-[2px_2px_0px_#4A3B32]"
                  onClick={() => deleteEntry.mutateAsync(entry.id)}
                >
                  <Trash2Icon className="w-5 h-5" strokeWidth={3} />
                </motion.button>
              </div>
            ))}
            <div className="h-4" /> {/* Spacer */}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-black text-[#4A3B32]">Add Meal</h3>
          <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
            <SelectTrigger className="w-full h-14 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-base font-bold focus:ring-0 focus:ring-offset-0 bg-white">
              <SelectValue placeholder="Select a recipe..." />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] overflow-hidden">
              <SelectGroup>
                {recipes?.map((r) => (
                  <SelectItem key={r.id} value={r.id} className="font-bold focus:bg-[#FFF9F2] cursor-pointer">{r.title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={mealType} onValueChange={setMealType}>
            <SelectTrigger className="w-full h-14 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-base font-bold focus:ring-0 focus:ring-offset-0 bg-white capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] overflow-hidden">
              <SelectGroup>
                <SelectItem value="breakfast" className="font-bold focus:bg-[#FFF9F2] cursor-pointer">Breakfast</SelectItem>
                <SelectItem value="lunch" className="font-bold focus:bg-[#FFF9F2] cursor-pointer">Lunch</SelectItem>
                <SelectItem value="dinner" className="font-bold focus:bg-[#FFF9F2] cursor-pointer">Dinner</SelectItem>
                <SelectItem value="snack" className="font-bold focus:bg-[#FFF9F2] cursor-pointer">Snack</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <motion.button
            whileHover={!selectedRecipeId || createEntry.isPending ? {} : { scale: 1.02, y: -2 }}
            whileTap={!selectedRecipeId || createEntry.isPending ? {} : { scale: 0.98, y: 0 }}
            className={`mt-2 w-full py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg flex items-center justify-center transition-all ${
              !selectedRecipeId || createEntry.isPending 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" 
                : "bg-[#98C9A3] text-white shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32]"
            }`}
            onClick={handleAdd}
            disabled={!selectedRecipeId || createEntry.isPending}
          >
            {createEntry.isPending ? (
              <div className="w-6 h-6 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
            ) : "Add to Calendar"}
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
