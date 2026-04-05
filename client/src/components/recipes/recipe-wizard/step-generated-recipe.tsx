"use client";

import { RecipeDetailView } from "@/components/recipes/recipe-detail-view";
import { useSaveRecipe } from "@/lib/hooks/use-recipes";
import { Button } from "@/components/ui/button";
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
        <Button variant="ghost" onClick={onDone}>
          View Later
        </Button>
        <Button onClick={handleSave} disabled={saveRecipe.isPending}>
          {saveRecipe.isPending ? "Saving..." : "Save Recipe"}
        </Button>
      </div>
    </div>
  );
}
