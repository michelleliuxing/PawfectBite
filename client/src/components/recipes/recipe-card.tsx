"use client";

import Link from "next/link";
import { Clock, Flame, ChevronRight } from "lucide-react";
import { SafetyBadge } from "./safety-badge";
import type { Recipe } from "@/lib/types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium">{recipe.title}</h3>
          {recipe.petName && (
            <p className="text-sm text-muted-foreground">For {recipe.petName}</p>
          )}
        </div>
        <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {recipe.prepTimeMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <Flame className="size-3.5" /> {recipe.estimatedCalories} kcal
        </span>
        <SafetyBadge riskLevel={recipe.riskLevel} />
      </div>

      {recipe.status === "SAVED" && (
        <span className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          Saved
        </span>
      )}
    </Link>
  );
}
