package com.pawfectbite.server.pets.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import com.pawfectbite.server.pets.domain.*;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "pets")
public class PetEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Species species;

    @Column(nullable = false, length = 100)
    private String breed;

    @Column(name = "age_years", nullable = false)
    private int ageYears;

    @Column(name = "age_months", nullable = false)
    private int ageMonths;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private Sex sex;

    @Column(name = "is_neutered", nullable = false)
    private boolean isNeutered;

    @Column(name = "weight_kg", nullable = false, precision = 6, scale = 2)
    private BigDecimal weightKg;

    @Column(name = "target_weight_kg", precision = 6, scale = 2)
    private BigDecimal targetWeightKg;

    @Enumerated(EnumType.STRING)
    @Column(name = "activity_level", nullable = false, length = 20)
    private ActivityLevel activityLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "living_environment", nullable = false, length = 10)
    private LivingEnvironment livingEnvironment;

    @Column(name = "health_goal", length = 500)
    private String healthGoal;

    @Column(name = "current_diet", length = 500)
    private String currentDiet;

    @Column(name = "feeding_frequency", nullable = false)
    private int feedingFrequency;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "pet_allergies", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "name")
    private List<String> allergies = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "pet_medical_conditions", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "name")
    private List<String> medicalConditions = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "pet_medications", joinColumns = @JoinColumn(name = "pet_id"))
    @Column(name = "name")
    private List<String> medications = new ArrayList<>();

    public PetEntity() {}

    public Pet toDomain() {
        return new Pet(
                id, userId, name, species, breed, ageYears, ageMonths,
                sex, isNeutered, weightKg, targetWeightKg, activityLevel,
                livingEnvironment, new ArrayList<>(allergies),
                new ArrayList<>(medicalConditions), new ArrayList<>(medications),
                healthGoal, currentDiet, feedingFrequency, getCreatedAt(), getUpdatedAt()
        );
    }

    public UUID getId() { return id; }
    public UUID getUserId() { return userId; }
    public String getName() { return name; }
    public Species getSpecies() { return species; }

    public void setUserId(UUID userId) { this.userId = userId; }
    public void setName(String name) { this.name = name; }
    public void setSpecies(Species species) { this.species = species; }
    public void setBreed(String breed) { this.breed = breed; }
    public void setAgeYears(int ageYears) { this.ageYears = ageYears; }
    public void setAgeMonths(int ageMonths) { this.ageMonths = ageMonths; }
    public void setSex(Sex sex) { this.sex = sex; }
    public void setNeutered(boolean neutered) { isNeutered = neutered; }
    public void setWeightKg(BigDecimal weightKg) { this.weightKg = weightKg; }
    public void setTargetWeightKg(BigDecimal targetWeightKg) { this.targetWeightKg = targetWeightKg; }
    public void setActivityLevel(ActivityLevel activityLevel) { this.activityLevel = activityLevel; }
    public void setLivingEnvironment(LivingEnvironment livingEnvironment) { this.livingEnvironment = livingEnvironment; }
    public void setHealthGoal(String healthGoal) { this.healthGoal = healthGoal; }
    public void setCurrentDiet(String currentDiet) { this.currentDiet = currentDiet; }
    public void setFeedingFrequency(int feedingFrequency) { this.feedingFrequency = feedingFrequency; }
    public void setAllergies(List<String> allergies) { this.allergies = new ArrayList<>(allergies); }
    public void setMedicalConditions(List<String> medicalConditions) { this.medicalConditions = new ArrayList<>(medicalConditions); }
    public void setMedications(List<String> medications) { this.medications = new ArrayList<>(medications); }
}
