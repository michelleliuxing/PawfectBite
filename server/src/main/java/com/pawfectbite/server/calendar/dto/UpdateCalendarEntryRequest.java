package com.pawfectbite.server.calendar.dto;

import java.time.LocalDate;
import java.util.UUID;

public record UpdateCalendarEntryRequest(
        UUID recipeId,
        LocalDate date,
        String mealType
) {}
