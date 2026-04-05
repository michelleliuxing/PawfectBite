package com.pawfectbite.server.recipes.domain;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.safety.domain.SafetyResult;

import java.util.List;

public record RecipePlan(
        Pet pet,
        String goal,
        List<String> approvedIngredients,
        List<String> excludedIngredients,
        String budget,
        int prepTimeMinutes,
        SafetyResult safetyResult,
        List<String> knowledgeContext
) {}
