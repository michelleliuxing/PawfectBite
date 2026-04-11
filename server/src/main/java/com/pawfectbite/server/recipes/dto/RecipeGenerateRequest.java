package com.pawfectbite.server.recipes.dto;

import jakarta.validation.constraints.*;

import java.util.List;
import java.util.UUID;

public record RecipeGenerateRequest(
        @NotNull UUID petId,
        @NotBlank String goal,
        List<String> ingredientsToInclude,
        List<String> ingredientsToExclude
) {}
