package com.pawfectbite.server.knowledge.domain;

import java.util.UUID;

public record NutritionGuidance(
        UUID id,
        String title,
        String category,
        String species,
        String contentText,
        String source
) {}
