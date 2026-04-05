import { apiClient } from "./client";
import type {
  Recipe,
  PrecheckResult,
  RecipePrecheckRequest,
  RecipeGenerateRequest,
} from "@/lib/types/recipe.types";

export const recipesApi = {
  precheck: (data: RecipePrecheckRequest) =>
    apiClient.post<PrecheckResult>("/api/recipes/precheck", data),

  generate: (data: RecipeGenerateRequest) =>
    apiClient.post<Recipe>("/api/recipes/generate", data),

  list: (petId?: string) => {
    const query = petId ? `?petId=${petId}` : "";
    return apiClient.get<Recipe[]>(`/api/recipes${query}`);
  },

  getById: (recipeId: string) =>
    apiClient.get<Recipe>(`/api/recipes/${recipeId}`),

  save: (recipeId: string) =>
    apiClient.post<Recipe>(`/api/recipes/${recipeId}/save`),

  delete: (recipeId: string) =>
    apiClient.delete<void>(`/api/recipes/${recipeId}`),
};
