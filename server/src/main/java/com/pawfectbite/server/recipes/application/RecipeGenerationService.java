package com.pawfectbite.server.recipes.application;

import com.pawfectbite.server.ai.application.LLMRecipeWriter;
import com.pawfectbite.server.ai.domain.StructuredRecipeOutput;
import com.pawfectbite.server.common.exception.SafetyBlockedException;
import com.pawfectbite.server.pets.application.PetService;
import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.recipes.domain.*;
import com.pawfectbite.server.recipes.dto.RecipeGenerateRequest;
import com.pawfectbite.server.recipes.dto.RecipePrecheckRequest;
import com.pawfectbite.server.recipes.repository.RecipeRepository;
import com.pawfectbite.server.safety.application.SafetyService;
import com.pawfectbite.server.safety.domain.SafetyResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class RecipeGenerationService {

    private static final Logger log = LoggerFactory.getLogger(RecipeGenerationService.class);

    private final PetService petService;
    private final SafetyService safetyService;
    private final RecipePlanBuilder planBuilder;
    private final LLMRecipeWriter llmWriter;
    private final RecipeValidator recipeValidator;
    private final RecipeRepository recipeRepository;

    public RecipeGenerationService(
            PetService petService,
            SafetyService safetyService,
            RecipePlanBuilder planBuilder,
            LLMRecipeWriter llmWriter,
            RecipeValidator recipeValidator,
            RecipeRepository recipeRepository
    ) {
        this.petService = petService;
        this.safetyService = safetyService;
        this.planBuilder = planBuilder;
        this.llmWriter = llmWriter;
        this.recipeValidator = recipeValidator;
        this.recipeRepository = recipeRepository;
    }

    public SafetyResult precheck(UUID userId, RecipePrecheckRequest request) {
        Pet pet = petService.getPetById(request.petId());

        List<String> allIngredients = new ArrayList<>();
        if (request.ingredientsToInclude() != null) allIngredients.addAll(request.ingredientsToInclude());

        return safetyService.evaluate(pet, allIngredients);
    }

    @Transactional
    public GeneratedRecipe generate(UUID userId, RecipeGenerateRequest request) {
        log.info("Starting recipe generation pipeline for user={}, pet={}", userId, request.petId());

        // Step 1: Load pet
        Pet pet = petService.getPetById(request.petId());

        // Step 2: Normalize input
        List<String> ingredientsToInclude = nullSafe(request.ingredientsToInclude());
        List<String> ingredientsToExclude = nullSafe(request.ingredientsToExclude());

        // Step 3: Safety evaluation
        SafetyResult safetyResult = safetyService.evaluate(pet, ingredientsToInclude);

        // Step 4: Block if unsafe
        if (!safetyResult.canProceed()) {
            List<String> reasons = safetyResult.warnings().stream().map(w -> w.message()).toList();
            log.warn("Recipe generation BLOCKED for pet={}: {}", pet.name(), reasons);
            throw new SafetyBlockedException(reasons);
        }

        // Step 5: Build recipe plan (includes knowledge retrieval)
        RecipePlan plan = planBuilder.build(
                pet, request.goal(), ingredientsToInclude, ingredientsToExclude,
                safetyResult
        );

        // Step 6: LLM generation
        StructuredRecipeOutput llmOutput = llmWriter.generateRecipe(plan);

        // Step 7: Map to domain and validate
        GeneratedRecipe recipe = new GeneratedRecipe(
                null, userId, pet.id(), pet.name(), null,
                llmOutput.title(), llmOutput.description(),
                llmOutput.ingredients().stream()
                        .map(i -> new GeneratedRecipe.RecipeIngredient(i.name(), i.amount(), i.unit(), i.notes()))
                        .toList(),
                llmOutput.steps(), llmOutput.estimatedCalories(),
                llmOutput.feedingPortions(), llmOutput.shoppingList(),
                llmOutput.storageGuidance(),
                llmOutput.cautionNotes(), safetyResult.riskLevel(),
                safetyResult.warnings(), RecipeStatus.DRAFT, null
        );

        recipeValidator.validate(recipe);

        // Step 8: Persist
        GeneratedRecipe saved = recipeRepository.save(recipe);
        log.info("Recipe generated and saved: id={}, title={}", saved.id(), saved.title());

        return saved;
    }

    private <T> List<T> nullSafe(List<T> list) {
        return list != null ? list : Collections.emptyList();
    }
}
