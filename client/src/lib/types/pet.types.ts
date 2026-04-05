export type Species = "DOG" | "CAT";
export type Sex = "MALE" | "FEMALE";
export type ActivityLevel = "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";
export type LivingEnvironment = "INDOOR" | "OUTDOOR" | "BOTH";

export interface Pet {
  id: string;
  userId: string;
  name: string;
  species: Species;
  breed: string;
  ageYears: number;
  ageMonths: number;
  sex: Sex;
  isNeutered: boolean;
  weightKg: number;
  targetWeightKg: number | null;
  activityLevel: ActivityLevel;
  livingEnvironment: LivingEnvironment;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  healthGoal: string | null;
  currentDiet: string | null;
  feedingFrequency: number;
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePetRequest {
  name: string;
  species: Species;
  breed: string;
  ageYears: number;
  ageMonths: number;
  sex: Sex;
  isNeutered: boolean;
  weightKg: number;
  targetWeightKg?: number | null;
  activityLevel: ActivityLevel;
  livingEnvironment: LivingEnvironment;
  allergies: string[];
  medicalConditions: string[];
  medications: string[];
  healthGoal?: string | null;
  currentDiet?: string | null;
  feedingFrequency: number;
}

export type UpdatePetRequest = CreatePetRequest;
