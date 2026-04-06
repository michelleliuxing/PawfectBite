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
          <div className="flex items-center gap-4">
            {recipe.status !== "SAVED" && (
              <button
                onClick={() => saveRecipe.mutateAsync(recipeId)}
                disabled={saveRecipe.isPending}
                className="flex items-center gap-2 rounded-full border-4 border-[#4A3B32] bg-[#F4D06F] text-[#4A3B32] px-6 py-2 font-black shadow-[4px_4px_0px_#4A3B32] transition-all hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#4A3B32] active:scale-95 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <Bookmark className="size-5" strokeWidth={3} />
                Save
              </button>
            )}
            <ConfirmDialog
              trigger={
                <button className="flex items-center gap-2 rounded-full border-4 border-[#4A3B32] bg-[#E88D72] text-white px-6 py-2 font-black shadow-[4px_4px_0px_#4A3B32] transition-all hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#4A3B32] active:scale-95 active:translate-y-1 active:shadow-none disabled:opacity-50 disabled:pointer-events-none">
                  <Trash2 className="size-5" strokeWidth={3} />
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
