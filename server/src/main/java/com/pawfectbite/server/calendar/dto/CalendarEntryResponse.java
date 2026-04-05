package com.pawfectbite.server.calendar.dto;

import com.pawfectbite.server.calendar.domain.CalendarEntry;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

public record CalendarEntryResponse(
        UUID id,
        UUID petId,
        String petName,
        UUID recipeId,
        String recipeTitle,
        LocalDate date,
        String mealType,
        Instant createdAt
) {
    public static CalendarEntryResponse from(CalendarEntry entry) {
        return new CalendarEntryResponse(
                entry.id(), entry.petId(), entry.petName(),
                entry.recipeId(), entry.recipeTitle(),
                entry.date(), entry.mealType(), entry.createdAt()
        );
    }
}
