package com.pawfectbite.server.calendar.repository;

import com.pawfectbite.server.calendar.domain.CalendarEntry;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CalendarEntryRepository {
    List<CalendarEntry> findByUserPetAndMonth(UUID userId, UUID petId, LocalDate start, LocalDate end);
    Optional<CalendarEntry> findById(UUID id);
    CalendarEntry save(UUID userId, UUID petId, UUID recipeId, LocalDate date, String mealType);
    CalendarEntry update(UUID id, UUID recipeId, LocalDate date, String mealType);
    void delete(UUID id);
}
