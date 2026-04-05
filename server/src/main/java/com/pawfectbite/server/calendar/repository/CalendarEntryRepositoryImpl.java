package com.pawfectbite.server.calendar.repository;

import com.pawfectbite.server.calendar.database.CalendarEntryEntity;
import com.pawfectbite.server.calendar.database.JpaCalendarEntryRepository;
import com.pawfectbite.server.calendar.domain.CalendarEntry;
import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class CalendarEntryRepositoryImpl implements CalendarEntryRepository {

    private final JpaCalendarEntryRepository jpa;

    public CalendarEntryRepositoryImpl(JpaCalendarEntryRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public List<CalendarEntry> findByUserPetAndMonth(UUID userId, UUID petId, LocalDate start, LocalDate end) {
        return jpa.findByUserIdAndPetIdAndEntryDateBetweenOrderByEntryDate(userId, petId, start, end)
                .stream().map(this::toDomain).toList();
    }

    @Override
    public Optional<CalendarEntry> findById(UUID id) {
        return jpa.findById(id).map(this::toDomain);
    }

    @Override
    public CalendarEntry save(UUID userId, UUID petId, UUID recipeId, LocalDate date, String mealType) {
        CalendarEntryEntity entity = new CalendarEntryEntity();
        entity.setUserId(userId);
        entity.setPetId(petId);
        entity.setRecipeId(recipeId);
        entity.setEntryDate(date);
        entity.setMealType(mealType);
        return toDomain(jpa.save(entity));
    }

    @Override
    public CalendarEntry update(UUID id, UUID recipeId, LocalDate date, String mealType) {
        CalendarEntryEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CalendarEntry", id));
        if (recipeId != null) entity.setRecipeId(recipeId);
        if (date != null) entity.setEntryDate(date);
        if (mealType != null) entity.setMealType(mealType);
        return toDomain(jpa.save(entity));
    }

    @Override
    public void delete(UUID id) {
        jpa.deleteById(id);
    }

    private CalendarEntry toDomain(CalendarEntryEntity e) {
        return new CalendarEntry(
                e.getId(), e.getUserId(), e.getPetId(), "",
                e.getRecipeId(), "", e.getEntryDate(), e.getMealType(),
                e.getCreatedAt()
        );
    }
}
