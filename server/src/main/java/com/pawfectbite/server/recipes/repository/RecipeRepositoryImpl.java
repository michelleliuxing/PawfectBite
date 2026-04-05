package com.pawfectbite.server.recipes.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.recipes.database.JpaRecipeRepository;
import com.pawfectbite.server.recipes.database.RecipeEntity;
import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.domain.RecipeStatus;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class RecipeRepositoryImpl implements RecipeRepository {

    private final JpaRecipeRepository jpa;
    private final ObjectMapper objectMapper;

    public RecipeRepositoryImpl(JpaRecipeRepository jpa, ObjectMapper objectMapper) {
        this.jpa = jpa;
        this.objectMapper = objectMapper;
    }

    @Override
    public GeneratedRecipe save(GeneratedRecipe recipe) {
        RecipeEntity entity = new RecipeEntity();
        entity.setUserId(recipe.userId());
        entity.setPetId(recipe.petId());
        entity.setRequestId(recipe.requestId());
        entity.setTitle(recipe.title());
        entity.setDescription(recipe.description());
        entity.setIngredientsJson(toJson(recipe.ingredients()));
        entity.setStepsJson(toJson(recipe.steps()));
        entity.setEstimatedCalories(recipe.estimatedCalories());
        entity.setFeedingPortions(recipe.feedingPortions());
        entity.setShoppingListJson(toJson(recipe.shoppingList()));
        entity.setPrepTimeMinutes(recipe.prepTimeMinutes());
        entity.setStorageGuidance(recipe.storageGuidance());
        entity.setCautionNotesJson(toJson(recipe.cautionNotes()));
        entity.setRiskLevel(recipe.riskLevel());
        entity.setWarningsJson(toJson(recipe.warnings()));
        entity.setStatus(recipe.status());
        RecipeEntity saved = jpa.save(entity);
        return toDomain(saved, recipe.petName());
    }

    @Override
    public Optional<GeneratedRecipe> findById(UUID id) {
        return jpa.findById(id).map(e -> toDomain(e, ""));
    }

    @Override
    public List<GeneratedRecipe> findByUserId(UUID userId) {
        return jpa.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(e -> toDomain(e, ""))
                .toList();
    }

    @Override
    public List<GeneratedRecipe> findByUserIdAndPetId(UUID userId, UUID petId) {
        return jpa.findByUserIdAndPetIdOrderByCreatedAtDesc(userId, petId).stream()
                .map(e -> toDomain(e, ""))
                .toList();
    }

    @Override
    public GeneratedRecipe updateStatus(UUID id, RecipeStatus status) {
        RecipeEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", id));
        entity.setStatus(status);
        return toDomain(jpa.save(entity), "");
    }

    @Override
    public void delete(UUID id) {
        jpa.deleteById(id);
    }

    private GeneratedRecipe toDomain(RecipeEntity e, String petName) {
        return new GeneratedRecipe(
                e.getId(), e.getUserId(), e.getPetId(), petName, e.getRequestId(),
                e.getTitle(), e.getDescription(),
                fromJson(e.getIngredientsJson(), new TypeReference<>() {}),
                fromJson(e.getStepsJson(), new TypeReference<>() {}),
                e.getEstimatedCalories(), e.getFeedingPortions(),
                fromJson(e.getShoppingListJson(), new TypeReference<>() {}),
                e.getPrepTimeMinutes(), e.getStorageGuidance(),
                fromJson(e.getCautionNotesJson(), new TypeReference<>() {}),
                e.getRiskLevel(),
                fromJson(e.getWarningsJson(), new TypeReference<>() {}),
                e.getStatus(), e.getCreatedAt()
        );
    }

    private String toJson(Object obj) {
        try { return objectMapper.writeValueAsString(obj); }
        catch (Exception e) { return "[]"; }
    }

    private <T> T fromJson(String json, TypeReference<T> ref) {
        try { return objectMapper.readValue(json == null ? "[]" : json, ref); }
        catch (Exception e) { return null; }
    }
}
