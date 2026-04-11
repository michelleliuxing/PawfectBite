package com.pawfectbite.server.ai.domain;

import java.util.List;

public record StructuredRecipeOutput(
        String title,
        String description,
        List<IngredientOutput> ingredients,
        List<String> steps,
        int estimatedCalories,
        String feedingPortions,
        List<String> shoppingList,
        String storageGuidance,
        List<String> cautionNotes
) {
    public record IngredientOutput(
            String name,
            String amount,
            String unit,
            String notes
    ) {}
}
