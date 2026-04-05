package com.pawfectbite.server.knowledge.domain;

import java.util.List;
import java.util.UUID;

public record IngredientKnowledge(
        UUID id,
        String name,
        String category,
        List<String> speciesSafe,
        String safetyNotes,
        String nutritionInfo,
        String contentText
) {}
