import { z } from "zod";

export const recipePrecheckSchema = z.object({
  petId: z.string().uuid("Please select a pet"),
  ingredientsToInclude: z.array(z.string()).default([]),
  ingredientsToExclude: z.array(z.string()).default([]),
  goal: z.string().min(1, "Please specify a goal").max(500),
});

export const recipeGenerateSchema = z.object({
  petId: z.string().uuid("Please select a pet"),
  goal: z.string().min(1, "Please specify a goal").max(500),
  ingredientsToInclude: z.array(z.string()).default([]),
  ingredientsToExclude: z.array(z.string()).default([]),
});

export type RecipePrecheckValues = z.infer<typeof recipePrecheckSchema>;
export type RecipeGenerateValues = z.infer<typeof recipeGenerateSchema>;
