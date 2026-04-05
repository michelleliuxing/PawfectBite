package com.pawfectbite.server.recipes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record RecipePrecheckRequest(
        @NotNull(message = "Pet ID is required")
        UUID petId,

        List<String> ingredientsToInclude,
        List<String> ingredientsToExclude,

        @NotBlank(message = "Goal is required")
        String goal
) {}
