import { ClockIcon, FlameIcon, ShoppingCartIcon, TriangleAlertIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { SafetyBadge } from "./safety-badge";
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

      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <ClockIcon className="size-4" />
          {recipe.prepTimeMinutes} min
        </div>
        <div className="flex items-center gap-1.5">
          <FlameIcon className="size-4" />
          {recipe.estimatedCalories} kcal
        </div>
        {recipe.feedingPortions && (
          <div>Portions: {recipe.feedingPortions}</div>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between text-sm">
                <span>{ing.name}</span>
                <span className="text-muted-foreground">{ing.amount} {ing.unit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-3">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {recipe.shoppingList.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <ShoppingCartIcon className="size-4" /> Shopping List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-1">
              {recipe.shoppingList.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span className="size-1.5 rounded-full bg-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {recipe.storageGuidance && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Storage Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{recipe.storageGuidance}</p>
          </CardContent>
        </Card>
      )}

      {recipe.cautionNotes.length > 0 && (
        <Alert>
          <TriangleAlertIcon className="text-amber-600" />
          <AlertTitle className="text-amber-700">Caution Notes</AlertTitle>
          <AlertDescription>
            <ul className="flex flex-col gap-2 pt-1">
              {recipe.cautionNotes.map((note, i) => (
                <li key={i} className="text-sm">{note}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {recipe.petName && (
        <>
          <Separator />
          <p className="text-sm text-muted-foreground">Recipe for <span className="font-medium text-foreground">{recipe.petName}</span></p>
        </>
      )}
    </div>
  );
}
