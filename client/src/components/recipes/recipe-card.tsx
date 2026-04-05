"use client";

import Link from "next/link";
import { ClockIcon, FlameIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafetyBadge } from "./safety-badge";
import type { Recipe } from "@/lib/types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="group">
      <Card className="transition-colors hover:bg-accent/50">
        <CardContent className="flex flex-col gap-3 p-4">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-medium">{recipe.title}</h3>
              {recipe.petName && (
                <p className="text-sm text-muted-foreground">For {recipe.petName}</p>
              )}
            </div>
            <ChevronRightIcon className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ClockIcon className="size-3.5" /> {recipe.prepTimeMinutes} min
            </span>
            <span className="flex items-center gap-1">
              <FlameIcon className="size-3.5" /> {recipe.estimatedCalories} kcal
            </span>
            <SafetyBadge riskLevel={recipe.riskLevel} />
          </div>

          {recipe.status === "SAVED" && (
            <Badge variant="secondary" className="self-start rounded-full">
              Saved
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
