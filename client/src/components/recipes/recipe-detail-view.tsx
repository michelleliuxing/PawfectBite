import { FlameIcon, ShoppingCartIcon, TriangleAlertIcon } from "lucide-react";
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
    <div className="flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-black text-[#4A3B32]">{recipe.title}</h2>
          <SafetyBadge riskLevel={recipe.riskLevel} />
        </div>
        {recipe.description && (
          <p className="mt-2 text-lg font-bold text-[#4A3B32]/70 leading-relaxed">{recipe.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-base font-bold text-[#4A3B32]/70">
        <div className="flex items-center gap-2 bg-[#FFF9F2] px-4 py-2 rounded-full border-2 border-[#4A3B32]/10">
          <FlameIcon className="size-5" strokeWidth={3} />
          {recipe.estimatedCalories} kcal
        </div>
        {recipe.feedingPortions && (
          <div className="flex items-center gap-2 bg-[#FFF9F2] px-4 py-2 rounded-full border-2 border-[#4A3B32]/10">Portions: {recipe.feedingPortions}</div>
        )}
      </div>

      <Card>
        <CardHeader className="pb-4 border-b-4 border-[#4A3B32]/10 mb-4">
          <CardTitle className="text-xl font-black text-[#4A3B32]">Ingredients</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {recipe.ingredients.map((ing, i) => (
              <li key={i} className="flex items-baseline justify-between text-lg font-bold text-[#4A3B32]">
                <span>{ing.name}</span>
                <span className="text-[#4A3B32]/60">{ing.amount} {ing.unit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4 border-b-4 border-[#4A3B32]/10 mb-4">
          <CardTitle className="text-xl font-black text-[#4A3B32]">Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-4">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4 text-lg font-bold text-[#4A3B32] leading-relaxed">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-4 border-[#4A3B32] bg-[#F4D06F] text-sm font-black text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32]">
                  {i + 1}
                </span>
                <span className="mt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {recipe.shoppingList.length > 0 && (
        <Card>
          <CardHeader className="pb-4 border-b-4 border-[#4A3B32]/10 mb-4">
            <CardTitle className="flex items-center gap-3 text-xl font-black text-[#4A3B32]">
              <ShoppingCartIcon className="size-6" strokeWidth={3} /> Shopping List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {recipe.shoppingList.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-bold text-[#4A3B32]">
                  <span className="size-2 rounded-full bg-[#4A3B32]" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {recipe.storageGuidance && (
        <Card>
          <CardHeader className="pb-4 border-b-4 border-[#4A3B32]/10 mb-4">
            <CardTitle className="text-xl font-black text-[#4A3B32]">Storage Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-[#4A3B32]/70 leading-relaxed">{recipe.storageGuidance}</p>
          </CardContent>
        </Card>
      )}

      {recipe.cautionNotes.length > 0 && (
        <Alert variant="destructive">
          <TriangleAlertIcon strokeWidth={3} />
          <AlertTitle>Caution Notes</AlertTitle>
          <AlertDescription>
            <ul className="flex flex-col gap-2 pt-2">
              {recipe.cautionNotes.map((note, i) => (
                <li key={i} className="text-lg">{note}</li>
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
