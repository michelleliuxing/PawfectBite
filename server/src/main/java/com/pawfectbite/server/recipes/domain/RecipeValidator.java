package com.pawfectbite.server.recipes.domain;

import com.pawfectbite.server.common.exception.AppException;
import org.springframework.stereotype.Component;

@Component
public class RecipeValidator {

    public void validate(GeneratedRecipe recipe) {
        if (recipe.title() == null || recipe.title().isBlank()) {
            throw new AppException("INVALID_RECIPE", "Generated recipe has no title");
        }
        if (recipe.ingredients() == null || recipe.ingredients().isEmpty()) {
            throw new AppException("INVALID_RECIPE", "Generated recipe has no ingredients");
        }
        if (recipe.steps() == null || recipe.steps().isEmpty()) {
            throw new AppException("INVALID_RECIPE", "Generated recipe has no steps");
        }
        if (recipe.estimatedCalories() <= 0) {
            throw new AppException("INVALID_RECIPE", "Generated recipe has invalid calorie count");
        }
    }
}
