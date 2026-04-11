package com.pawfectbite.server.calendar.repository;

import com.pawfectbite.server.calendar.database.CalendarEntryEntity;
import com.pawfectbite.server.calendar.database.JpaCalendarEntryRepository;
import com.pawfectbite.server.calendar.domain.CalendarEntry;
import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.pets.database.JpaPetRepository;
import com.pawfectbite.server.recipes.database.JpaRecipeRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
public class CalendarEntryRepositoryImpl implements CalendarEntryRepository {

    private final JpaCalendarEntryRepository jpa;
    private final JpaRecipeRepository jpaRecipes;
    private final JpaPetRepository jpaPets;

    public CalendarEntryRepositoryImpl(JpaCalendarEntryRepository jpa,
                                       JpaRecipeRepository jpaRecipes,
                                       JpaPetRepository jpaPets) {
        this.jpa = jpa;
        this.jpaRecipes = jpaRecipes;
        this.jpaPets = jpaPets;
    }

    @Override
    public List<CalendarEntry> findByUserPetAndMonth(UUID userId, UUID petId, LocalDate start, LocalDate end) {
        List<CalendarEntryEntity> entities =
                jpa.findByUserIdAndPetIdAndEntryDateBetweenOrderByEntryDate(userId, petId, start, end);

        Set<UUID> recipeIds = entities.stream().map(CalendarEntryEntity::getRecipeId).collect(Collectors.toSet());
        Set<UUID> petIds = entities.stream().map(CalendarEntryEntity::getPetId).collect(Collectors.toSet());

        Map<UUID, String> recipeTitles = jpaRecipes.findAllById(recipeIds).stream()
                .collect(Collectors.toMap(r -> r.getId(), r -> r.getTitle()));
        Map<UUID, String> petNames = jpaPets.findAllById(petIds).stream()
                .collect(Collectors.toMap(p -> p.getId(), p -> p.getName()));

        return entities.stream()
                .map(e -> toDomain(e,
                        recipeTitles.getOrDefault(e.getRecipeId(), ""),
                        petNames.getOrDefault(e.getPetId(), "")))
                .toList();
    }

    @Override
    public Optional<CalendarEntry> findById(UUID id) {
        return jpa.findById(id).map(e -> {
            String recipeTitle = jpaRecipes.findById(e.getRecipeId()).map(r -> r.getTitle()).orElse("");
            String petName = jpaPets.findById(e.getPetId()).map(p -> p.getName()).orElse("");
            return toDomain(e, recipeTitle, petName);
        });
    }

    @Override
    public CalendarEntry save(UUID userId, UUID petId, UUID recipeId, LocalDate date, String mealType) {
        CalendarEntryEntity entity = new CalendarEntryEntity();
        entity.setUserId(userId);
        entity.setPetId(petId);
        entity.setRecipeId(recipeId);
        entity.setEntryDate(date);
        entity.setMealType(mealType);
        CalendarEntryEntity saved = jpa.save(entity);
        String recipeTitle = jpaRecipes.findById(recipeId).map(r -> r.getTitle()).orElse("");
        String petName = jpaPets.findById(petId).map(p -> p.getName()).orElse("");
        return toDomain(saved, recipeTitle, petName);
    }

    @Override
    public CalendarEntry update(UUID id, UUID recipeId, LocalDate date, String mealType) {
        CalendarEntryEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("CalendarEntry", id));
        if (recipeId != null) entity.setRecipeId(recipeId);
        if (date != null) entity.setEntryDate(date);
        if (mealType != null) entity.setMealType(mealType);
        CalendarEntryEntity saved = jpa.save(entity);
        String recipeTitle = jpaRecipes.findById(saved.getRecipeId()).map(r -> r.getTitle()).orElse("");
        String petName = jpaPets.findById(saved.getPetId()).map(p -> p.getName()).orElse("");
        return toDomain(saved, recipeTitle, petName);
    }

    @Override
    public void delete(UUID id) {
        jpa.deleteById(id);
    }

    private CalendarEntry toDomain(CalendarEntryEntity e, String recipeTitle, String petName) {
        return new CalendarEntry(
                e.getId(), e.getUserId(), e.getPetId(), petName,
                e.getRecipeId(), recipeTitle, e.getEntryDate(), e.getMealType(),
                e.getCreatedAt()
        );
    }
}
