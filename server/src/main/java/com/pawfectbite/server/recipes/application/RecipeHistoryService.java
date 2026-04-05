package com.pawfectbite.server.recipes.application;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.domain.RecipeStatus;
import com.pawfectbite.server.recipes.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class RecipeHistoryService {

    private final RecipeRepository recipeRepository;

    public RecipeHistoryService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    public List<GeneratedRecipe> getRecipesByUser(UUID userId) {
        return recipeRepository.findByUserId(userId);
    }

    public List<GeneratedRecipe> getRecipesByUserAndPet(UUID userId, UUID petId) {
        return recipeRepository.findByUserIdAndPetId(userId, petId);
    }

    public GeneratedRecipe getRecipeById(UUID recipeId) {
        return recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe", recipeId));
    }

    @Transactional
    public GeneratedRecipe saveRecipe(UUID recipeId) {
        return recipeRepository.updateStatus(recipeId, RecipeStatus.SAVED);
    }

    @Transactional
    public void deleteRecipe(UUID recipeId) {
        recipeRepository.delete(recipeId);
    }
}
