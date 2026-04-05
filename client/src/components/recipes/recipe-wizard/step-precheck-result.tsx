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
      <div className="flex items-center gap-3">
        <SafetyBadge riskLevel={result.riskLevel} />
        <span className="text-sm text-muted-foreground">
          {result.canProceed ? "You can proceed with recipe generation" : "Recipe generation is blocked"}
        </span>
      </div>

      {result.warnings.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Warnings</h3>
          {result.warnings.map((w, i) => (
            <Alert key={i}>
              <ShieldAlertIcon className="text-amber-600" />
              <AlertDescription className="flex flex-col gap-1.5">
                <span>{w.message}</span>
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
