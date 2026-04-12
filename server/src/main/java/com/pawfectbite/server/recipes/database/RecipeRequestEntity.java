package com.pawfectbite.server.recipes.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import com.pawfectbite.server.safety.domain.RiskLevel;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.UUID;

@Entity
@Table(name = "recipe_requests")
public class RecipeRequestEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "pet_id", nullable = false)
    private UUID petId;

    @Column(nullable = false, length = 500)
    private String goal;

    @Column(name = "ingredients_to_include", columnDefinition = "TEXT[]")
    private String[] ingredientsToInclude;

    @Column(name = "ingredients_to_exclude", columnDefinition = "TEXT[]")
    private String[] ingredientsToExclude;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_level", nullable = false, length = 10)
    private RiskLevel riskLevel;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "safety_warnings", columnDefinition = "JSONB", nullable = false)
    private String safetyWarningsJson;

    public RecipeRequestEntity() {}

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public UUID getPetId() { return petId; }
    public String getGoal() { return goal; }
    public String[] getIngredientsToInclude() { return ingredientsToInclude; }
    public String[] getIngredientsToExclude() { return ingredientsToExclude; }
    public RiskLevel getRiskLevel() { return riskLevel; }
    public String getSafetyWarningsJson() { return safetyWarningsJson; }

    public void setUserId(UUID userId) { this.userId = userId; }
    public void setPetId(UUID petId) { this.petId = petId; }
    public void setGoal(String goal) { this.goal = goal; }
    public void setIngredientsToInclude(String[] ingredientsToInclude) { this.ingredientsToInclude = ingredientsToInclude; }
    public void setIngredientsToExclude(String[] ingredientsToExclude) { this.ingredientsToExclude = ingredientsToExclude; }
    public void setRiskLevel(RiskLevel riskLevel) { this.riskLevel = riskLevel; }
    public void setSafetyWarningsJson(String safetyWarningsJson) { this.safetyWarningsJson = safetyWarningsJson; }
}
