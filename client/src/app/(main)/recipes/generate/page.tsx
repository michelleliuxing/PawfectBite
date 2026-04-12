"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/layout/page-header";
import { StepSelectPet } from "@/components/recipes/recipe-wizard/step-select-pet";
import { StepPreferences } from "@/components/recipes/recipe-wizard/step-preferences";
import { StepPrecheckResult } from "@/components/recipes/recipe-wizard/step-precheck-result";
import { StepGeneratedRecipe } from "@/components/recipes/recipe-wizard/step-generated-recipe";
import { useRecipePrecheck, useGenerateRecipe } from "@/lib/hooks/use-recipes";
import { SparklesIcon } from "lucide-react";
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
    <div className="w-full max-w-7xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#E88D72] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[-3deg]">
            <SparklesIcon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight">Generate Recipe</h1>
            <p className="text-lg font-medium text-[#4A3B32]/70">Step: {stepLabels[step]}</p>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 md:p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] relative overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
