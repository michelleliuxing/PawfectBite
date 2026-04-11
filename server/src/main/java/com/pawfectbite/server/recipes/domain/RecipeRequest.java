package com.pawfectbite.server.recipes.domain;

import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyWarning;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record RecipeRequest(
        UUID id,
        UUID userId,
        UUID petId,
        String goal,
        List<String> ingredientsToInclude,
        List<String> ingredientsToExclude,
        RiskLevel riskLevel,
        List<SafetyWarning> safetyWarnings,
        Instant createdAt
) {}
