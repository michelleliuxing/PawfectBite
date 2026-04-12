"use client";

import { RecipeDetailView } from "@/components/recipes/recipe-detail-view";
import { useSaveRecipe } from "@/lib/hooks/use-recipes";
import { motion } from "framer-motion";
import type { Recipe } from "@/lib/types/recipe.types";

interface StepGeneratedRecipeProps {
  recipe: Recipe;
  onDone: () => void;
}

export function StepGeneratedRecipe({ recipe, onDone }: StepGeneratedRecipeProps) {
  const saveRecipe = useSaveRecipe();

  const handleSave = async () => {
    await saveRecipe.mutateAsync(recipe.id);
    onDone();
  };

  return (
    <div className="flex flex-col gap-8">
      <RecipeDetailView recipe={recipe} />

      {/* Buttons */}
      <div className="flex justify-between pt-6 border-t-4 border-[#4A3B32]/10">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          onClick={onDone}
          className="px-8 py-4 rounded-full border-4 border-[#4A3B32] bg-white text-[#4A3B32] font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all hover:bg-[#FFF9F2] hover:shadow-[6px_6px_0px_#4A3B32]"
        >
          View Later
        </motion.button>
        <motion.button
          whileHover={saveRecipe.isPending ? {} : { scale: 1.02, y: -2 }}
          whileTap={saveRecipe.isPending ? {} : { scale: 0.98, y: 0 }}
          onClick={handleSave}
          disabled={saveRecipe.isPending}
          className={`px-8 py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all flex items-center justify-center min-w-[220px] ${
            saveRecipe.isPending
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : "bg-[#E88D72] text-white hover:shadow-[6px_6px_0px_#4A3B32]"
          }`}
        >
          {saveRecipe.isPending ? (
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            "Save Recipe"
          )}
        </motion.button>
      </div>
    </div>
  );
}
