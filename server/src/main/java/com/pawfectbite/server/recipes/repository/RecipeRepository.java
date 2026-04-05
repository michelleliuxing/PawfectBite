package com.pawfectbite.server.recipes.repository;

import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.domain.RecipeStatus;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RecipeRepository {
    GeneratedRecipe save(GeneratedRecipe recipe);
    Optional<GeneratedRecipe> findById(UUID id);
    List<GeneratedRecipe> findByUserId(UUID userId);
    List<GeneratedRecipe> findByUserIdAndPetId(UUID userId, UUID petId);
    GeneratedRecipe updateStatus(UUID id, RecipeStatus status);
    void delete(UUID id);
}
