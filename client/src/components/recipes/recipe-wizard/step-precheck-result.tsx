"use client";

import { SafetyBadge } from "@/components/recipes/safety-badge";
import { ShieldAlert } from "lucide-react";
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
            <div key={i} className="flex items-start gap-2 rounded-lg border p-3">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <div>
                <p className="text-sm">{w.message}</p>
                <SafetyBadge riskLevel={w.severity} className="mt-1" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent">
          Back
        </button>
        {result.canProceed && (
          <button
            onClick={onProceed}
            disabled={isGenerating}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm disabled:opacity-50"
          >
            {isGenerating ? "Generating recipe..." : "Generate Recipe"}
          </button>
        )}
      </div>
    </div>
  );
}
