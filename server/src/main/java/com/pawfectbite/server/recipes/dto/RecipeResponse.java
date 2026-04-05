package com.pawfectbite.server.recipes.dto;

import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.domain.RecipeStatus;
import com.pawfectbite.server.safety.domain.RiskLevel;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record RecipeResponse(
        UUID id,
        UUID petId,
        String petName,
        String title,
        String description,
        List<IngredientDto> ingredients,
        List<String> steps,
        int estimatedCalories,
        String feedingPortions,
        List<String> shoppingList,
        int prepTimeMinutes,
        String storageGuidance,
        List<String> cautionNotes,
        RiskLevel riskLevel,
        List<WarningDto> warnings,
        RecipeStatus status,
        Instant createdAt
) {
    public record IngredientDto(String name, String amount, String unit, String notes) {}
    public record WarningDto(String ruleType, String message, RiskLevel severity) {}

    public static RecipeResponse from(GeneratedRecipe r) {
        return new RecipeResponse(
                r.id(), r.petId(), r.petName(), r.title(), r.description(),
                r.ingredients().stream().map(i -> new IngredientDto(i.name(), i.amount(), i.unit(), i.notes())).toList(),
                r.steps(), r.estimatedCalories(), r.feedingPortions(),
                r.shoppingList(), r.prepTimeMinutes(), r.storageGuidance(), r.cautionNotes(),
                r.riskLevel(),
                r.warnings().stream().map(w -> new WarningDto(w.ruleType(), w.message(), w.severity())).toList(),
                r.status(), r.createdAt()
        );
    }
}
