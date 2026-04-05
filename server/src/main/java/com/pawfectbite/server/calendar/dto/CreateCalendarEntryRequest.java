package com.pawfectbite.server.calendar.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.UUID;

public record CreateCalendarEntryRequest(
        @NotNull UUID petId,
        @NotNull UUID recipeId,
        @NotNull LocalDate date,
        @NotBlank String mealType
) {}
