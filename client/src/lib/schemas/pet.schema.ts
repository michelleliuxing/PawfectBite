import { z } from "zod";

export const petFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  species: z.enum(["DOG", "CAT"], { required_error: "Species is required" }),
  breed: z.string().min(1, "Breed is required").max(100),
  ageYears: z.coerce.number().int().min(0).max(30),
  ageMonths: z.coerce.number().int().min(0).max(11),
  sex: z.enum(["MALE", "FEMALE"], { required_error: "Sex is required" }),
  isNeutered: z.boolean(),
  weightKg: z.coerce.number().positive("Weight must be positive").max(200),
  targetWeightKg: z.coerce.number().positive().max(200).nullable().optional(),
  activityLevel: z.enum(["LOW", "MODERATE", "HIGH", "VERY_HIGH"], {
    required_error: "Activity level is required",
  }),
  livingEnvironment: z.enum(["INDOOR", "OUTDOOR", "BOTH"], {
    required_error: "Living environment is required",
  }),
  allergies: z.array(z.string()).default([]),
  medicalConditions: z.array(z.string()).default([]),
  medications: z.array(z.string()).default([]),
  healthGoal: z.string().max(500).nullable().optional(),
  currentDiet: z.string().max(500).nullable().optional(),
  feedingFrequency: z.coerce.number().int().min(1).max(6),
});

export type PetFormValues = z.infer<typeof petFormSchema>;
