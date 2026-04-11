export type RiskLevel = "GREEN" | "AMBER" | "RED" | "BLOCKED";
export type RecipeStatus = "DRAFT" | "SAVED" | "ARCHIVED";

export interface SafetyWarning {
  ruleType: string;
  message: string;
  severity: RiskLevel;
}

export interface PrecheckResult {
  riskLevel: RiskLevel;
  warnings: SafetyWarning[];
  canProceed: boolean;
}

export interface RecipeIngredient {
  name: string;
  amount: string;
  unit: string;
  notes: string | null;
}

export interface Recipe {
  id: string;
  petId: string;
  petName: string;
  title: string;
  description: string;
  ingredients: RecipeIngredient[];
  steps: string[];
  estimatedCalories: number;
  feedingPortions: string;
  shoppingList: string[];
  storageGuidance: string;
  cautionNotes: string[];
  riskLevel: RiskLevel;
  warnings: SafetyWarning[];
  status: RecipeStatus;
  createdAt: string;
}

export interface RecipePrecheckRequest {
  petId: string;
  ingredientsToInclude: string[];
  ingredientsToExclude: string[];
  goal: string;
}

export interface RecipeGenerateRequest {
  petId: string;
  goal: string;
  ingredientsToInclude: string[];
  ingredientsToExclude: string[];
}
