"use client";

import Link from "next/link";
import { FlameIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafetyBadge } from "./safety-badge";
import type { Recipe } from "@/lib/types/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block h-full group">
      <Card className="h-full border-4 border-[#4A3B32] bg-white transition-all group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_#4A3B32] overflow-hidden rounded-[2.5rem]">
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-black text-xl text-[#4A3B32]">{recipe.title}</h3>
              {recipe.petName && (
                <p className="text-base font-bold text-[#4A3B32]/70">For {recipe.petName}</p>
              )}
            </div>
            <ChevronRightIcon className="mt-1 size-8 shrink-0 text-[#4A3B32] transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#4A3B32]/70">
            <span className="flex items-center gap-1.5 bg-[#FFF9F2] px-3 py-1.5 rounded-full border-2 border-[#4A3B32]/10">
              <FlameIcon className="size-4" strokeWidth={3} /> {recipe.estimatedCalories} kcal
            </span>
            <SafetyBadge riskLevel={recipe.riskLevel} />
          </div>

          {recipe.status === "SAVED" && (
            <Badge variant="secondary" className="self-start">
              Saved
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
