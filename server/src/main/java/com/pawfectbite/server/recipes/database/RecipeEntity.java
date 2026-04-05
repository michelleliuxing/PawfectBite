package com.pawfectbite.server.recipes.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import com.pawfectbite.server.recipes.domain.GeneratedRecipe;
import com.pawfectbite.server.recipes.domain.RecipeStatus;
import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "recipes")
public class RecipeEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "pet_id", nullable = false)
    private UUID petId;

    @Column(name = "request_id")
    private UUID requestId;

    @Transient
    private String petName;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "ingredients", columnDefinition = "JSONB", nullable = false)
    private String ingredientsJson;

    @Column(name = "steps", columnDefinition = "JSONB", nullable = false)
    private String stepsJson;

    @Column(name = "estimated_calories")
    private int estimatedCalories;

    @Column(name = "feeding_portions")
    private String feedingPortions;

    @Column(name = "shopping_list", columnDefinition = "JSONB")
    private String shoppingListJson;

    @Column(name = "prep_time_minutes")
    private int prepTimeMinutes;

    @Column(name = "storage_guidance", columnDefinition = "TEXT")
    private String storageGuidance;

    @Column(name = "caution_notes", columnDefinition = "JSONB")
    private String cautionNotesJson;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 10)
    private RiskLevel riskLevel;

    @Column(name = "warnings", columnDefinition = "JSONB")
    private String warningsJson;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private RecipeStatus status;

    public RecipeEntity() {}

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public UUID getPetId() { return petId; }
    public String getTitle() { return title; }
    public RecipeStatus getStatus() { return status; }
    public RiskLevel getRiskLevel() { return riskLevel; }

    public void setUserId(UUID userId) { this.userId = userId; }
    public void setPetId(UUID petId) { this.petId = petId; }
    public void setRequestId(UUID requestId) { this.requestId = requestId; }
    public void setPetName(String petName) { this.petName = petName; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setIngredientsJson(String json) { this.ingredientsJson = json; }
    public void setStepsJson(String json) { this.stepsJson = json; }
    public void setEstimatedCalories(int cal) { this.estimatedCalories = cal; }
    public void setFeedingPortions(String portions) { this.feedingPortions = portions; }
    public void setShoppingListJson(String json) { this.shoppingListJson = json; }
    public void setPrepTimeMinutes(int minutes) { this.prepTimeMinutes = minutes; }
    public void setStorageGuidance(String guidance) { this.storageGuidance = guidance; }
    public void setCautionNotesJson(String json) { this.cautionNotesJson = json; }
    public void setRiskLevel(RiskLevel level) { this.riskLevel = level; }
    public void setWarningsJson(String json) { this.warningsJson = json; }
    public void setStatus(RecipeStatus status) { this.status = status; }

    public String getIngredientsJson() { return ingredientsJson; }
    public String getStepsJson() { return stepsJson; }
    public String getShoppingListJson() { return shoppingListJson; }
    public String getCautionNotesJson() { return cautionNotesJson; }
    public String getWarningsJson() { return warningsJson; }
    public int getEstimatedCalories() { return estimatedCalories; }
    public String getFeedingPortions() { return feedingPortions; }
    public int getPrepTimeMinutes() { return prepTimeMinutes; }
    public String getStorageGuidance() { return storageGuidance; }
    public String getDescription() { return description; }
    public UUID getRequestId() { return requestId; }
}
