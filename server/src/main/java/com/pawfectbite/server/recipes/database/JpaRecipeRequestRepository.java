package com.pawfectbite.server.recipes.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaRecipeRequestRepository extends JpaRepository<RecipeRequestEntity, UUID> {
    List<RecipeRequestEntity> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<RecipeRequestEntity> findByUserIdAndPetIdOrderByCreatedAtDesc(UUID userId, UUID petId);
}
