package com.pawfectbite.server.recipes.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaRecipeRepository extends JpaRepository<RecipeEntity, UUID> {
    List<RecipeEntity> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<RecipeEntity> findByUserIdAndPetIdOrderByCreatedAtDesc(UUID userId, UUID petId);
}
