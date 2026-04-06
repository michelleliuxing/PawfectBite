"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { recipesApi } from "@/lib/api/recipes.api";
import type { RecipePrecheckRequest, RecipeGenerateRequest } from "@/lib/types/recipe.types";

const RECIPES_KEY = ["recipes"] as const;

export function useRecipes(petId?: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [...RECIPES_KEY, { petId }],
    queryFn: () => recipesApi.list(petId),
    ...options,
  });
}

export function useRecipe(recipeId: string) {
  return useQuery({
    queryKey: [...RECIPES_KEY, recipeId],
    queryFn: () => recipesApi.getById(recipeId),
    enabled: !!recipeId,
  });
}

export function useRecipePrecheck() {
  return useMutation({
    mutationFn: (data: RecipePrecheckRequest) => recipesApi.precheck(data),
  });
}

export function useGenerateRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecipeGenerateRequest) => recipesApi.generate(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}

export function useSaveRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipeId: string) => recipesApi.save(recipeId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (recipeId: string) => recipesApi.delete(recipeId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: RECIPES_KEY }),
  });
}
