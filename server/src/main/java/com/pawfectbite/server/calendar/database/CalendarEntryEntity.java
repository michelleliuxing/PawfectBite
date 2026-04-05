package com.pawfectbite.server.calendar.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "calendar_entries")
public class CalendarEntryEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "pet_id", nullable = false)
    private UUID petId;

    @Column(name = "recipe_id", nullable = false)
    private UUID recipeId;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(name = "meal_type", nullable = false, length = 50)
    private String mealType;

    public CalendarEntryEntity() {}

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public UUID getPetId() { return petId; }
    public UUID getRecipeId() { return recipeId; }
    public LocalDate getEntryDate() { return entryDate; }
    public String getMealType() { return mealType; }

    public void setUserId(UUID userId) { this.userId = userId; }
    public void setPetId(UUID petId) { this.petId = petId; }
    public void setRecipeId(UUID recipeId) { this.recipeId = recipeId; }
    public void setEntryDate(LocalDate entryDate) { this.entryDate = entryDate; }
    public void setMealType(String mealType) { this.mealType = mealType; }
}
