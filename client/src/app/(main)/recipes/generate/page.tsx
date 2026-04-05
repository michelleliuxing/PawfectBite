"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { StepSelectPet } from "@/components/recipes/recipe-wizard/step-select-pet";
import { StepPreferences } from "@/components/recipes/recipe-wizard/step-preferences";
import { StepPrecheckResult } from "@/components/recipes/recipe-wizard/step-precheck-result";
import { StepGeneratedRecipe } from "@/components/recipes/recipe-wizard/step-generated-recipe";
import { useRecipePrecheck, useGenerateRecipe } from "@/lib/hooks/use-recipes";
import type { PrecheckResult, Recipe } from "@/lib/types/recipe.types";

type WizardStep = "select-pet" | "preferences" | "precheck" | "result";

export default function GenerateRecipePage() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>("select-pet");
  const [selectedPetId, setSelectedPetId] = useState<string>("");
  const [preferences, setPreferences] = useState({
    goal: "",
    ingredientsToInclude: [] as string[],
    ingredientsToExclude: [] as string[],
    budget: "",
    prepTimeMinutes: 30,
  });
  const [precheckResult, setPrecheckResult] = useState<PrecheckResult | null>(null);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const precheck = useRecipePrecheck();
  const generate = useGenerateRecipe();

  const handlePetSelected = (petId: string) => {
    setSelectedPetId(petId);
    setStep("preferences");
  };

  const handlePreferencesSubmit = async (prefs: typeof preferences) => {
    setPreferences(prefs);
    const result = await precheck.mutateAsync({
      petId: selectedPetId,
      ingredientsToInclude: prefs.ingredientsToInclude,
      ingredientsToExclude: prefs.ingredientsToExclude,
      goal: prefs.goal,
    });
    setPrecheckResult(result);
    setStep("precheck");
  };

  const handleProceedToGenerate = async () => {
    const recipe = await generate.mutateAsync({
      petId: selectedPetId,
      ...preferences,
    });
    setGeneratedRecipe(recipe);
    setStep("result");
  };

  const stepLabels: Record<WizardStep, string> = {
    "select-pet": "Select Pet",
    preferences: "Preferences",
    precheck: "Safety Check",
    result: "Your Recipe",
  };

  return (
    <div>
      <PageHeader
        title="Generate Recipe"
        description={`Step: ${stepLabels[step]}`}
      />

      <div className="mx-auto max-w-2xl">
        {step === "select-pet" && (
          <StepSelectPet onSelect={handlePetSelected} />
        )}

        {step === "preferences" && (
          <StepPreferences
            onSubmit={handlePreferencesSubmit}
            isLoading={precheck.isPending}
            onBack={() => setStep("select-pet")}
          />
        )}

        {step === "precheck" && precheckResult && (
          <StepPrecheckResult
            result={precheckResult}
            onProceed={handleProceedToGenerate}
            isGenerating={generate.isPending}
            onBack={() => setStep("preferences")}
          />
        )}

        {step === "result" && generatedRecipe && (
          <StepGeneratedRecipe
            recipe={generatedRecipe}
            onDone={() => router.push(`/recipes/${generatedRecipe.id}`)}
          />
        )}
      </div>
    </div>
  );
}
