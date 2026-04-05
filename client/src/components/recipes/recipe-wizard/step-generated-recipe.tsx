"use client";

import { RecipeDetailView } from "@/components/recipes/recipe-detail-view";
import { useSaveRecipe } from "@/lib/hooks/use-recipes";
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
    <div className="flex flex-col gap-6">
      <RecipeDetailView recipe={recipe} />

      <div className="flex justify-end gap-3">
        <button onClick={onDone} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent">
          View Later
        </button>
        <button
          onClick={handleSave}
          disabled={saveRecipe.isPending}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm disabled:opacity-50"
        >
          {saveRecipe.isPending ? "Saving..." : "Save Recipe"}
        </button>
      </div>
    </div>
  );
}
