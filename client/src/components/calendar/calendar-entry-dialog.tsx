"use client";

import { useState } from "react";
import { Trash2Icon, Plus, Check, Dog, Cat } from "lucide-react";
import { motion } from "framer-motion";
import { useQueries } from "@tanstack/react-query";
import { usePets } from "@/lib/hooks/use-pets";
import { recipesApi } from "@/lib/api/recipes.api";
import { useCreateCalendarEntry, useDeleteCalendarEntry, useCalendarEntries, useAllCalendarEntries } from "@/lib/hooks/use-calendar";
import { formatDisplayDate } from "@/lib/utils/format";
import Image from "next/image";
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

const MEAL_TYPE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  breakfast: { bg: "bg-[#FFD89B]", text: "text-[#4A3B32]", label: "Breakfast" },
  lunch:     { bg: "bg-[#98C9A3]", text: "text-white",     label: "Lunch"     },
  dinner:    { bg: "bg-[#B5A4E5]", text: "text-white",     label: "Dinner"    },
  snack:     { bg: "bg-[#F7B2B7]", text: "text-[#4A3B32]", label: "Snack"     },
};

const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast", bg: "bg-[#FFD89B]", text: "text-[#4A3B32]" },
  { value: "lunch",     label: "Lunch",     bg: "bg-[#98C9A3]", text: "text-white"     },
  { value: "dinner",    label: "Dinner",    bg: "bg-[#B5A4E5]", text: "text-white"     },
  { value: "snack",     label: "Snack",     bg: "bg-[#F7B2B7]", text: "text-[#4A3B32]" },
];

// ─── Add Meal Dialog ───────────────────────────────────────────────────────────

interface AddMealDialogProps {
  date: string;
  onClose: () => void;
}

function AddMealDialog({ date, onClose }: AddMealDialogProps) {
  const { data: pets } = usePets();
  const createEntry = useCreateCalendarEntry();
  const [selectedPetIds, setSelectedPetIds] = useState<string[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState("");
  const [mealType, setMealType] = useState("breakfast");

  const recipeQueries = useQueries({
    queries: selectedPetIds.map((petId) => ({
      queryKey: ["recipes", { petId }],
      queryFn: () => recipesApi.list(petId),
    })),
  });

  const allRecipes = recipeQueries.flatMap((q) => q.data ?? []);
  const multiplePetsSelected = selectedPetIds.length > 1;

  const togglePet = (petId: string) => {
    setSelectedPetIds((prev) =>
      prev.includes(petId) ? prev.filter((id) => id !== petId) : [...prev, petId]
    );
    setSelectedRecipeId("");
  };

  const handleSubmit = async () => {
    if (!selectedRecipeId || selectedPetIds.length === 0) return;
    await Promise.all(
      selectedPetIds.map((petId) =>
        createEntry.mutateAsync({ petId, recipeId: selectedRecipeId, date, mealType })
      )
    );
    onClose();
  };

  const canSubmit = !!selectedRecipeId && selectedPetIds.length > 0 && !createEntry.isPending;

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-[#4A3B32]">Add a Meal</DialogTitle>
          <p className="text-sm font-bold text-[#4A3B32]/60 mt-0.5">
            {formatDisplayDate(new Date(date + "T00:00:00"))}
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-2 pb-2">
          {/* Pet selection */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-black text-[#4A3B32]">Which pet(s) is this for?</h3>
            <div className="grid grid-cols-3 gap-3">
              {pets?.map((pet) => {
                const isSelected = selectedPetIds.includes(pet.id);
                return (
                  <motion.button
                    key={pet.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => togglePet(pet.id)}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-4 transition-colors ${
                      isSelected
                        ? "border-[#4A3B32] bg-[#4A3B32] shadow-[4px_4px_0px_#98C9A3]"
                        : "border-[#4A3B32] bg-white hover:bg-[#FFF9F2] shadow-[2px_2px_0px_#4A3B32]"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full border-4 border-[#4A3B32] overflow-hidden bg-[#FFF9F2] flex items-center justify-center shrink-0">
                      {pet.photoUrl ? (
                        <Image
                          src={pet.photoUrl}
                          alt={pet.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      ) : pet.species === "DOG" ? (
                        <Dog className={`w-7 h-7 ${isSelected ? "text-white" : "text-[#4A3B32]"}`} />
                      ) : (
                        <Cat className={`w-7 h-7 ${isSelected ? "text-white" : "text-[#4A3B32]"}`} />
                      )}
                    </div>
                    <span className={`text-xs font-black truncate w-full text-center ${isSelected ? "text-white" : "text-[#4A3B32]"}`}>
                      {pet.name}
                    </span>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#98C9A3] border-2 border-white flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Recipe selection — revealed after pet(s) chosen */}
          {selectedPetIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-base font-black text-[#4A3B32]">Select a recipe</h3>
              <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                <SelectTrigger className="w-full h-14 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-base font-bold focus:ring-0 focus:ring-offset-0 bg-white">
                  <SelectValue placeholder="Choose a recipe..." />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-4 border-[#4A3B32] shadow-[8px_8px_0px_#4A3B32] overflow-hidden">
                  <SelectGroup>
                    {allRecipes.length === 0 ? (
                      <div className="px-4 py-3 text-sm font-bold text-[#4A3B32]/60">
                        No recipes found for selected pet(s)
                      </div>
                    ) : (
                      allRecipes.map((r) => (
                        <SelectItem key={r.id} value={r.id} className="font-bold focus:bg-[#FFF9F2] cursor-pointer">
                          {multiplePetsSelected ? `${r.title} — ${r.petName}` : r.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </motion.div>
          )}

          {/* Meal type — revealed after recipe chosen */}
          {selectedRecipeId && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-3"
            >
              <h3 className="text-base font-black text-[#4A3B32]">Meal type</h3>
              <div className="grid grid-cols-4 gap-2">
                {MEAL_TYPES.map((type) => (
                  <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMealType(type.value)}
                    className={`py-2.5 rounded-xl border-4 border-[#4A3B32] text-xs font-black transition-all ${
                      mealType === type.value
                        ? `${type.bg} ${type.text} shadow-[3px_3px_0px_#4A3B32]`
                        : "bg-white text-[#4A3B32] hover:bg-[#FFF9F2] shadow-[2px_2px_0px_#4A3B32]"
                    }`}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Submit */}
          <motion.button
            whileHover={!canSubmit ? {} : { scale: 1.02, y: -2 }}
            whileTap={!canSubmit ? {} : { scale: 0.98, y: 0 }}
            className={`w-full py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg flex items-center justify-center transition-all ${
              !canSubmit
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-[#98C9A3] text-white shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32]"
            }`}
            onClick={handleSubmit}
            disabled={!canSubmit}
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

// ─── Date Entry Dialog ─────────────────────────────────────────────────────────

interface CalendarEntryDialogProps {
  date: string;
  petId?: string;
  isAllPets?: boolean;
  onClose: () => void;
}

export function CalendarEntryDialog({ date, petId, isAllPets, onClose }: CalendarEntryDialogProps) {
  const { data: pets } = usePets();
  const deleteEntry = useDeleteCalendarEntry();
  const [showAddMeal, setShowAddMeal] = useState(false);

  const monthStr = date.substring(0, 7);
  const allPetIds = (pets ?? []).map((p) => p.id);

  const { data: singleMonthEntries } = useCalendarEntries(petId ?? "", monthStr);
  const { data: allMonthEntries } = useAllCalendarEntries(isAllPets ? allPetIds : [], monthStr);

  const monthEntries = isAllPets ? allMonthEntries : singleMonthEntries;
  const entries = (monthEntries ?? []).filter((e) => e.date === date);

  const petById = Object.fromEntries((pets ?? []).map((p) => [p.id, p]));

  return (
    <>
      <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{formatDisplayDate(new Date(date + "T00:00:00"))}</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            {entries.length > 0 && (
              <>
                <h3 className="text-lg font-black text-[#4A3B32]">Scheduled Meals</h3>
                {entries.map((entry) => {
                  const mealStyle = MEAL_TYPE_STYLES[entry.mealType] ?? { bg: "bg-[#E8DDD0]", text: "text-[#4A3B32]", label: entry.mealType };
                  const pet = petById[entry.petId];
                  return (
                    <div key={entry.id} className="flex items-center gap-3 rounded-2xl border-4 border-[#4A3B32] p-4 bg-[#FFF9F2] shadow-[4px_4px_0px_#4A3B32]">
                      {/* Pet avatar */}
                      <div className="w-10 h-10 shrink-0 rounded-full border-4 border-[#4A3B32] overflow-hidden bg-white flex items-center justify-center shadow-[2px_2px_0px_#4A3B32]">
                        {pet?.photoUrl ? (
                          <Image src={pet.photoUrl} alt={pet.name} width={40} height={40} className="w-full h-full object-cover" />
                        ) : pet?.species === "DOG" ? (
                          <Dog className="w-5 h-5 text-[#4A3B32]" />
                        ) : (
                          <Cat className="w-5 h-5 text-[#4A3B32]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border-2 border-[#4A3B32] shadow-[1px_1px_0px_#4A3B32] ${mealStyle.bg} ${mealStyle.text}`}>
                            {mealStyle.label}
                          </span>
                          {isAllPets && entry.petName && (
                            <span className="text-xs font-black text-[#4A3B32]/60">
                              {entry.petName}
                            </span>
                          )}
                        </div>
                        <p className="text-base font-bold text-[#4A3B32] truncate">{entry.recipeTitle || "Recipe"}</p>
                      </div>

                      {/* Delete */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-1 w-10 h-10 shrink-0 rounded-full border-4 border-[#4A3B32] bg-[#F7B2B7] flex items-center justify-center text-white shadow-[2px_2px_0px_#4A3B32]"
                        onClick={() => deleteEntry.mutateAsync(entry.id)}
                      >
                        <Trash2Icon className="w-5 h-5" strokeWidth={3} />
                      </motion.button>
                    </div>
                  );
                })}
                <div className="h-1" />
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              onClick={() => setShowAddMeal(true)}
              className="w-full py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg flex items-center justify-center gap-2 bg-[#98C9A3] text-white shadow-[4px_4px_0px_#4A3B32] hover:shadow-[6px_6px_0px_#4A3B32] transition-all"
            >
              <Plus className="w-5 h-5" strokeWidth={3} />
              Add a Meal
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>

      {showAddMeal && (
        <AddMealDialog date={date} onClose={() => setShowAddMeal(false)} />
      )}
    </>
  );
}
