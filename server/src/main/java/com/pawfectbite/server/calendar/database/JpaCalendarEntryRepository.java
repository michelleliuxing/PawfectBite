package com.pawfectbite.server.calendar.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface JpaCalendarEntryRepository extends JpaRepository<CalendarEntryEntity, UUID> {
    List<CalendarEntryEntity> findByUserIdAndPetIdAndEntryDateBetweenOrderByEntryDate(
            UUID userId, UUID petId, LocalDate start, LocalDate end);
}
