package com.pawfectbite.server.calendar.domain;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record CalendarEntry(
        UUID id,
        UUID userId,
        UUID petId,
        String petName,
        UUID recipeId,
        String recipeTitle,
        LocalDate date,
        String mealType,
        Instant createdAt
) {}
