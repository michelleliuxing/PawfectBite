package com.pawfectbite.server.pets.dto;

import com.pawfectbite.server.pets.domain.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record PetResponse(
        UUID id,
        UUID userId,
        String name,
        Species species,
        String breed,
        int ageYears,
        int ageMonths,
        Sex sex,
        boolean isNeutered,
        BigDecimal weightKg,
        BigDecimal targetWeightKg,
        ActivityLevel activityLevel,
        LivingEnvironment livingEnvironment,
        List<String> allergies,
        List<String> medicalConditions,
        List<String> medications,
        String healthGoal,
        String currentDiet,
        int feedingFrequency,
        Instant createdAt,
        Instant updatedAt
) {
    public static PetResponse from(Pet pet) {
        return new PetResponse(
                pet.id(), pet.userId(), pet.name(), pet.species(), pet.breed(),
                pet.ageYears(), pet.ageMonths(), pet.sex(), pet.isNeutered(),
                pet.weightKg(), pet.targetWeightKg(), pet.activityLevel(),
                pet.livingEnvironment(), pet.allergies(), pet.medicalConditions(),
                pet.medications(), pet.healthGoal(), pet.currentDiet(),
                pet.feedingFrequency(), pet.createdAt(), pet.updatedAt()
        );
    }
}
