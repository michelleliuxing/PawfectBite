"use client";

import { useParams, useRouter } from "next/navigation";
import { Bookmark, Trash2 } from "lucide-react";
import { useRecipe, useSaveRecipe, useDeleteRecipe } from "@/lib/hooks/use-recipes";
import { PageHeader } from "@/components/layout/page-header";
import { RecipeDetailView } from "@/components/recipes/recipe-detail-view";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.recipeId as string;
  const { data: recipe, isLoading, error } = useRecipe(recipeId);
  const saveRecipe = useSaveRecipe();
  const deleteRecipe = useDeleteRecipe();

  if (isLoading) return <LoadingSpinner message="Loading recipe..." color="orange" />;
  if (error) return <ErrorAlert message="Failed to load recipe" />;
  if (!recipe) return null;

  return (
    <div>
      <PageHeader
        title={recipe.title}
        description={recipe.petName ? `Recipe for ${recipe.petName}` : undefined}
        action={
          <div className="flex items-center gap-2">
            {recipe.status !== "SAVED" && (
              <button
                onClick={() => saveRecipe.mutateAsync(recipeId)}
                disabled={saveRecipe.isPending}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                <Bookmark className="size-4" />
                Save
              </button>
            )}
            <ConfirmDialog
              trigger={
                <button className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                  Delete
                </button>
              }
              title="Delete Recipe"
              description="Are you sure you want to delete this recipe?"
              confirmLabel="Delete"
              variant="destructive"
              onConfirm={async () => {
                await deleteRecipe.mutateAsync(recipeId);
                router.push("/recipes");
              }}
            />
          </div>
        }
      />
      <div className="mx-auto max-w-2xl">
        <RecipeDetailView recipe={recipe} />
      </div>
    </div>
  );
}
