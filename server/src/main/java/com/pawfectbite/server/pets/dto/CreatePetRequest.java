package com.pawfectbite.server.pets.dto;

import com.pawfectbite.server.pets.domain.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.util.List;

public record CreatePetRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 100)
        String name,

        @NotNull(message = "Species is required")
        Species species,

        @NotBlank(message = "Breed is required")
        @Size(max = 100)
        String breed,

        @Min(0) @Max(30)
        int ageYears,

        @Min(0) @Max(11)
        int ageMonths,

        @NotNull(message = "Sex is required")
        Sex sex,

        boolean isNeutered,

        @NotNull @DecimalMin("0.1") @DecimalMax("200")
        BigDecimal weightKg,

        @DecimalMin("0.1") @DecimalMax("200")
        BigDecimal targetWeightKg,

        @NotNull(message = "Activity level is required")
        ActivityLevel activityLevel,

        @NotNull(message = "Living environment is required")
        LivingEnvironment livingEnvironment,

        List<String> allergies,
        List<String> medicalConditions,
        List<String> medications,

        @Size(max = 500)
        String healthGoal,

        @Size(max = 500)
        String currentDiet,

        @Min(1) @Max(6)
        int feedingFrequency
) {}
