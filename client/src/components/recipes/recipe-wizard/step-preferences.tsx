"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StepPreferencesProps {
  onSubmit: (prefs: {
    goal: string;
    ingredientsToInclude: string[];
    ingredientsToExclude: string[];
  }) => void;
  isLoading: boolean;
  onBack: () => void;
}

export function StepPreferences({ onSubmit, isLoading, onBack }: StepPreferencesProps) {
  const [goal, setGoal] = useState("");
  const [includeInput, setIncludeInput] = useState("");
  const [excludeInput, setExcludeInput] = useState("");
  const [includes, setIncludes] = useState<string[]>([]);
  const [excludes, setExcludes] = useState<string[]>([]);

  const addTag = (value: string, list: string[], setter: (v: string[]) => void, inputSetter: (v: string) => void) => {
    const trimmed = value.trim();
    if (trimmed && !list.includes(trimmed)) {
      setter([...list, trimmed]);
    }
    inputSetter("");
  };

  const removeTag = (index: number, list: string[], setter: (v: string[]) => void) => {
    setter(list.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Goal */}
      <div className="flex flex-col gap-3">
        <label className="text-xl font-black text-[#4A3B32]">Goal</label>
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Weight management, high protein, sensitive stomach"
          className="w-full h-14 px-5 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-lg font-bold bg-white focus:outline-none focus:shadow-[6px_6px_0px_#4A3B32] transition-all placeholder:text-[#4A3B32]/40"
        />
      </div>

      {/* Include Ingredients */}
      <div className="flex flex-col gap-3">
        <label className="text-xl font-black text-[#4A3B32]">Ingredients to Include</label>
        <div className="flex gap-3">
          <input
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(includeInput, includes, setIncludes, setIncludeInput);
              }
            }}
            placeholder="e.g. chicken, rice..."
            className="flex-1 h-14 px-5 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-lg font-bold bg-white focus:outline-none focus:shadow-[6px_6px_0px_#4A3B32] transition-all placeholder:text-[#4A3B32]/40"
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            onClick={() => addTag(includeInput, includes, setIncludes, setIncludeInput)}
            className="h-14 px-8 rounded-2xl border-4 border-[#4A3B32] bg-[#E88D72] text-white font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all hover:shadow-[6px_6px_0px_#4A3B32] active:shadow-none"
          >
            Add
          </motion.button>
        </div>
        {includes.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-1">
            {includes.map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border-4 border-[#4A3B32] bg-[#98C9A3] pl-4 pr-1.5 py-1.5 text-base font-black text-white shadow-[2px_2px_0px_#4A3B32]">
                {t}
                <button
                  onClick={() => removeTag(i, includes, setIncludes)}
                  className="rounded-full p-1 bg-white border-2 border-[#4A3B32] text-[#4A3B32] hover:bg-[#FFF9F2] transition-colors"
                >
                  <XIcon className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Exclude Ingredients */}
      <div className="flex flex-col gap-3">
        <label className="text-xl font-black text-[#4A3B32]">Ingredients to Exclude</label>
        <div className="flex gap-3">
          <input
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(excludeInput, excludes, setExcludes, setExcludeInput);
              }
            }}
            placeholder="e.g. beef, dairy..."
            className="flex-1 h-14 px-5 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] text-lg font-bold bg-white focus:outline-none focus:shadow-[6px_6px_0px_#4A3B32] transition-all placeholder:text-[#4A3B32]/40"
          />
          <motion.button
            type="button"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            onClick={() => addTag(excludeInput, excludes, setExcludes, setExcludeInput)}
            className="h-14 px-8 rounded-2xl border-4 border-[#4A3B32] bg-[#E88D72] text-white font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all hover:shadow-[6px_6px_0px_#4A3B32] active:shadow-none"
          >
            Add
          </motion.button>
        </div>
        {excludes.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-1">
            {excludes.map((t, i) => (
              <div key={i} className="flex items-center gap-2 rounded-full border-4 border-[#4A3B32] bg-[#F7B2B7] pl-4 pr-1.5 py-1.5 text-base font-black text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32]">
                {t}
                <button
                  onClick={() => removeTag(i, excludes, setExcludes)}
                  className="rounded-full p-1 bg-white border-2 border-[#4A3B32] text-[#4A3B32] hover:bg-[#FFF9F2] transition-colors"
                >
                  <XIcon className="w-4 h-4" strokeWidth={3} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
        <motion.button
          whileHover={!goal || isLoading ? {} : { scale: 1.02, y: -2 }}
          whileTap={!goal || isLoading ? {} : { scale: 0.98, y: 0 }}
          onClick={() => onSubmit({ goal, ingredientsToInclude: includes, ingredientsToExclude: excludes })}
          disabled={!goal || isLoading}
          className={`px-8 py-4 rounded-full border-4 border-[#4A3B32] font-black text-lg shadow-[4px_4px_0px_#4A3B32] transition-all flex items-center justify-center min-w-[220px] ${
            !goal || isLoading
              ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
              : "bg-[#98C9A3] text-white hover:shadow-[6px_6px_0px_#4A3B32]"
          }`}
        >
          {isLoading ? (
            <div className="w-6 h-6 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
          ) : (
            "Run Safety Check"
          )}
        </motion.button>
      </div>
    </div>
  );
}
