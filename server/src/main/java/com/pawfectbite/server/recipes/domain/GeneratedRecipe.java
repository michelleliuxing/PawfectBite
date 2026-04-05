package com.pawfectbite.server.recipes.domain;

import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyWarning;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record GeneratedRecipe(
        UUID id,
        UUID userId,
        UUID petId,
        String petName,
        UUID requestId,
        String title,
        String description,
        List<RecipeIngredient> ingredients,
        List<String> steps,
        int estimatedCalories,
        String feedingPortions,
        List<String> shoppingList,
        int prepTimeMinutes,
        String storageGuidance,
        List<String> cautionNotes,
        RiskLevel riskLevel,
        List<SafetyWarning> warnings,
        RecipeStatus status,
        Instant createdAt
) {
    public record RecipeIngredient(
            String name,
            String amount,
            String unit,
            String notes
    ) {}
}
