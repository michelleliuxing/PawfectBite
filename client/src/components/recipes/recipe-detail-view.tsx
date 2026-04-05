import { SafetyBadge } from "./safety-badge";
import { Clock, Flame, ShoppingCart, AlertTriangle } from "lucide-react";
import type { Recipe } from "@/lib/types/recipe.types";

interface RecipeDetailViewProps {
  recipe: Recipe;
}

export function RecipeDetailView({ recipe }: RecipeDetailViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">{recipe.title}</h2>
          <SafetyBadge riskLevel={recipe.riskLevel} />
        </div>
        {recipe.description && (
          <p className="mt-1 text-sm text-muted-foreground">{recipe.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="size-4" />
          {recipe.prepTimeMinutes} min
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Flame className="size-4" />
          {recipe.estimatedCalories} kcal
        </div>
        {recipe.feedingPortions && (
          <div className="text-muted-foreground">Portions: {recipe.feedingPortions}</div>
        )}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="mb-3 font-medium">Ingredients</h3>
        <ul className="flex flex-col gap-2">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex items-baseline justify-between text-sm">
              <span>{ing.name}</span>
              <span className="text-muted-foreground">{ing.amount} {ing.unit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h3 className="mb-3 font-medium">Steps</h3>
        <ol className="flex flex-col gap-3">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {recipe.shoppingList.length > 0 && (
        <div className="rounded-xl border bg-card p-5">
          <h3 className="mb-3 flex items-center gap-2 font-medium">
            <ShoppingCart className="size-4" /> Shopping List
          </h3>
          <ul className="flex flex-col gap-1">
            {recipe.shoppingList.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {recipe.storageGuidance && (
        <div className="rounded-xl border bg-card p-5">
          <h3 className="mb-2 font-medium">Storage Guidance</h3>
          <p className="text-sm text-muted-foreground">{recipe.storageGuidance}</p>
        </div>
      )}

      {recipe.cautionNotes.length > 0 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
          <h3 className="mb-3 flex items-center gap-2 font-medium text-amber-700">
            <AlertTriangle className="size-4" /> Caution Notes
          </h3>
          <ul className="flex flex-col gap-2">
            {recipe.cautionNotes.map((note, i) => (
              <li key={i} className="text-sm text-amber-800">{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
