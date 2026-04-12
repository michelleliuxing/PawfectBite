package com.pawfectbite.server.recipes.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pawfectbite.server.recipes.database.JpaRecipeRequestRepository;
import com.pawfectbite.server.recipes.database.RecipeRequestEntity;
import com.pawfectbite.server.recipes.domain.RecipeRequest;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class RecipeRequestRepositoryImpl implements RecipeRequestRepository {

    private final JpaRecipeRequestRepository jpa;
    private final ObjectMapper objectMapper;

    public RecipeRequestRepositoryImpl(JpaRecipeRequestRepository jpa, ObjectMapper objectMapper) {
        this.jpa = jpa;
        this.objectMapper = objectMapper;
    }

    @Override
    public RecipeRequest save(RecipeRequest request) {
        RecipeRequestEntity entity = new RecipeRequestEntity();
        entity.setUserId(request.userId());
        entity.setPetId(request.petId());
        entity.setGoal(request.goal());
        entity.setIngredientsToInclude(request.ingredientsToInclude().toArray(new String[0]));
        entity.setIngredientsToExclude(request.ingredientsToExclude().toArray(new String[0]));
        entity.setRiskLevel(request.riskLevel());
        entity.setSafetyWarningsJson(toJson(request.safetyWarnings()));

        RecipeRequestEntity saved = jpa.save(entity);
        return toDomain(saved);
    }

    private RecipeRequest toDomain(RecipeRequestEntity e) {
        return new RecipeRequest(
                e.getId(),
                e.getUserId(),
                e.getPetId(),
                e.getGoal(),
                e.getIngredientsToInclude() != null ? List.of(e.getIngredientsToInclude()) : List.of(),
                e.getIngredientsToExclude() != null ? List.of(e.getIngredientsToExclude()) : List.of(),
                e.getRiskLevel(),
                fromJson(e.getSafetyWarningsJson()),
                e.getCreatedAt()
        );
    }

    private String toJson(Object obj) {
        try { return objectMapper.writeValueAsString(obj); }
        catch (Exception e) { return "[]"; }
    }

    @SuppressWarnings("unchecked")
    private List<SafetyWarning> fromJson(String json) {
        try {
            return objectMapper.readValue(
                    json == null ? "[]" : json,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, SafetyWarning.class)
            );
        } catch (Exception e) { return List.of(); }
    }
}
