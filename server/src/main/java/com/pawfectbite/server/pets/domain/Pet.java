package com.pawfectbite.server.pets.domain;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record Pet(
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
) {}
