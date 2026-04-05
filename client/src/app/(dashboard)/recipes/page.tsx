"use client";

import Link from "next/link";
import { Plus, ChefHat } from "lucide-react";
import { useRecipes } from "@/lib/hooks/use-recipes";
import { usePets } from "@/lib/hooks/use-pets";
import { RecipeCard } from "@/components/recipes/recipe-card";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import { EmptyState } from "@/components/shared/empty-state";
import { useState } from "react";

export default function RecipesPage() {
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>();
  const { data: recipes, isLoading, error, refetch } = useRecipes(selectedPetId);
  const { data: pets } = usePets();

  return (
    <div>
      <PageHeader
        title="Recipes"
        description="Your generated recipe history"
        action={
          <Link
            href="/recipes/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Generate Recipe
          </Link>
        }
      />

      {pets && pets.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedPetId(undefined)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !selectedPetId ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
          >
            All Pets
          </button>
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPetId(pet.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedPetId === pet.id ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {pet.name}
            </button>
          ))}
        </div>
      )}

      {isLoading && <LoadingSpinner message="Loading recipes..." />}

      {error && (
        <ErrorAlert
          message={error instanceof Error ? error.message : "Failed to load recipes"}
          onRetry={() => refetch()}
        />
      )}

      {recipes && recipes.length === 0 && (
        <EmptyState
          icon={ChefHat}
          title="No recipes yet"
          description="Generate your first personalized meal recipe"
          action={
            <Link
              href="/recipes/generate"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm"
            >
              <Plus className="size-4" />
              Generate Recipe
            </Link>
          }
        />
      )}

      {recipes && recipes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
