"use client";

import { ShieldAlertIcon } from "lucide-react";
import { SafetyBadge } from "@/components/recipes/safety-badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PrecheckResult } from "@/lib/types/recipe.types";

interface StepPrecheckResultProps {
  result: PrecheckResult;
  onProceed: () => void;
  isGenerating: boolean;
  onBack: () => void;
}

export function StepPrecheckResult({ result, onProceed, isGenerating, onBack }: StepPrecheckResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 bg-[#FFF9F2] p-6 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
        <SafetyBadge riskLevel={result.riskLevel} />
        <span className="text-xl font-bold text-[#4A3B32]">
          {result.canProceed ? "You can proceed with recipe generation" : "Recipe generation is blocked"}
        </span>
      </div>

      {result.warnings.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-2xl font-black text-[#4A3B32]">Warnings</h3>
          {result.warnings.map((w, i) => (
            <Alert key={i} variant="destructive">
              <ShieldAlertIcon />
              <AlertDescription className="flex flex-col gap-3">
                <span className="text-lg">{w.message}</span>
                <SafetyBadge riskLevel={w.severity} />
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        {result.canProceed && (
          <Button onClick={onProceed} disabled={isGenerating}>
            {isGenerating ? "Generating recipe..." : "Generate Recipe"}
          </Button>
        )}
      </div>
    </div>
  );
}
