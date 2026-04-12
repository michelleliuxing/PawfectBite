"use client";

import { ShieldAlertIcon } from "lucide-react";
import { motion } from "framer-motion";
import { SafetyBadge } from "@/components/recipes/safety-badge";
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
      <div className="flex items-center gap-4 bg-white p-6 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32]">
        <SafetyBadge riskLevel={result.riskLevel} />
        <span className="text-xl font-black text-[#4A3B32]">
          {result.canProceed ? "You can proceed with recipe generation" : "Recipe generation is blocked"}
        </span>
      </div>

      {result.warnings.length > 0 && (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-2xl font-black text-[#4A3B32]">Warnings</h3>
          {result.warnings.map((w, i) => (
            <div key={i} className="flex gap-4 p-5 rounded-2xl border-4 border-[#4A3B32] bg-[#F7B2B7] shadow-[4px_4px_0px_#4A3B32]">
              <div className="w-12 h-12 shrink-0 rounded-full border-4 border-[#4A3B32] bg-white flex items-center justify-center shadow-[2px_2px_0px_#4A3B32]">
                <ShieldAlertIcon className="w-6 h-6 text-[#4A3B32]" strokeWidth={3} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold text-[#4A3B32]">{w.message}</span>
                <div>
                  <SafetyBadge riskLevel={w.severity} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex justify-between pt-6 border-t-4 border-[#4A3B32]/10 mt-2">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          onClick={onBack}
          className="px-8 py-4 rounded-full border-4 border-[#4A3B32] bg-white text-[#4A3B32] font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all hover:bg-[#FFF9F2] hover:shadow-[6px_6px_0px_#4A3B32]"
        >
          Back
        </motion.button>
        {result.canProceed && (
          <motion.button
            whileHover={isGenerating ? {} : { scale: 1.02, y: -2 }}
            whileTap={isGenerating ? {} : { scale: 0.98, y: 0 }}
            onClick={onProceed}
            disabled={isGenerating}
            className={`px-8 py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all flex items-center justify-center min-w-[220px] ${
              isGenerating
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-[#98C9A3] text-white hover:shadow-[6px_6px_0px_#4A3B32]"
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
                Generating...
              </div>
            ) : (
              "Generate Recipe"
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
