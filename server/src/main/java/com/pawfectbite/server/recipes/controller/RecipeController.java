package com.pawfectbite.server.recipes.controller;

import com.pawfectbite.server.common.response.ApiResponse;
import com.pawfectbite.server.infrastructure.security.AuthenticatedUser;
import com.pawfectbite.server.infrastructure.security.OwnershipEnforcer;
import com.pawfectbite.server.recipes.application.RecipeGenerationService;
import com.pawfectbite.server.recipes.application.RecipeHistoryService;
import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.dto.*;
import com.pawfectbite.server.safety.domain.SafetyResult;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeGenerationService generationService;
    private final RecipeHistoryService historyService;
    private final OwnershipEnforcer ownershipEnforcer;

    public RecipeController(
            RecipeGenerationService generationService,
            RecipeHistoryService historyService,
            OwnershipEnforcer ownershipEnforcer
    ) {
        this.generationService = generationService;
        this.historyService = historyService;
        this.ownershipEnforcer = ownershipEnforcer;
    }

    @PostMapping("/precheck")
    public ApiResponse<RecipePrecheckResponse> precheck(
            @Valid @RequestBody RecipePrecheckRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        SafetyResult result = generationService.precheck(principal.userId(), request);
        return ApiResponse.ok(RecipePrecheckResponse.from(result));
    }

    @PostMapping("/generate")
    public ApiResponse<RecipeResponse> generate(
            @Valid @RequestBody RecipeGenerateRequest request,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        GeneratedRecipe recipe = generationService.generate(principal.userId(), request);
        return ApiResponse.ok(RecipeResponse.from(recipe));
    }

    @GetMapping
    public ApiResponse<List<RecipeResponse>> listRecipes(
            @RequestParam(required = false) UUID petId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        List<GeneratedRecipe> recipes = petId != null
                ? historyService.getRecipesByUserAndPet(principal.userId(), petId)
                : historyService.getRecipesByUser(principal.userId());
        return ApiResponse.ok(recipes.stream().map(RecipeResponse::from).toList());
    }

    @GetMapping("/{recipeId}")
    public ApiResponse<RecipeResponse> getRecipe(
            @PathVariable UUID recipeId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        GeneratedRecipe recipe = historyService.getRecipeById(recipeId);
        ownershipEnforcer.enforce(recipe.userId());
        return ApiResponse.ok(RecipeResponse.from(recipe));
    }

    @PostMapping("/{recipeId}/save")
    public ApiResponse<RecipeResponse> saveRecipe(
            @PathVariable UUID recipeId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        GeneratedRecipe existing = historyService.getRecipeById(recipeId);
        ownershipEnforcer.enforce(existing.userId());
        GeneratedRecipe saved = historyService.saveRecipe(recipeId);
        return ApiResponse.ok(RecipeResponse.from(saved));
    }

    @DeleteMapping("/{recipeId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecipe(
            @PathVariable UUID recipeId,
            @AuthenticationPrincipal AuthenticatedUser principal
    ) {
        GeneratedRecipe recipe = historyService.getRecipeById(recipeId);
        ownershipEnforcer.enforce(recipe.userId());
        historyService.deleteRecipe(recipeId);
    }
}
