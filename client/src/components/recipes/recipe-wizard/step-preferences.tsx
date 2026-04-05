"use client";

import { useState } from "react";

interface StepPreferencesProps {
  onSubmit: (prefs: {
    goal: string;
    ingredientsToInclude: string[];
    ingredientsToExclude: string[];
    budget: string;
    prepTimeMinutes: number;
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
  const [budget, setBudget] = useState("");
  const [prepTime, setPrepTime] = useState(30);

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

  const inputClass = "rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Goal</label>
        <input value={goal} onChange={(e) => setGoal(e.target.value)} className={inputClass} placeholder="e.g. Weight management, high protein, sensitive stomach" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Ingredients to Include</label>
        <div className="flex gap-2">
          <input value={includeInput} onChange={(e) => setIncludeInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(includeInput, includes, setIncludes, setIncludeInput); } }} className={inputClass + " flex-1"} placeholder="e.g. chicken, rice..." />
          <button type="button" onClick={() => addTag(includeInput, includes, setIncludes, setIncludeInput)} className="rounded-md bg-secondary px-3 py-2 text-sm font-medium">Add</button>
        </div>
        {includes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">{includes.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700">{t}<button onClick={() => removeTag(i, includes, setIncludes)} className="ml-1">&times;</button></span>
          ))}</div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Ingredients to Exclude</label>
        <div className="flex gap-2">
          <input value={excludeInput} onChange={(e) => setExcludeInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(excludeInput, excludes, setExcludes, setExcludeInput); } }} className={inputClass + " flex-1"} placeholder="e.g. beef, dairy..." />
          <button type="button" onClick={() => addTag(excludeInput, excludes, setExcludes, setExcludeInput)} className="rounded-md bg-secondary px-3 py-2 text-sm font-medium">Add</button>
        </div>
        {excludes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">{excludes.map((t, i) => (
            <span key={i} className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-700">{t}<button onClick={() => removeTag(i, excludes, setExcludes)} className="ml-1">&times;</button></span>
          ))}</div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Budget</label>
          <input value={budget} onChange={(e) => setBudget(e.target.value)} className={inputClass} placeholder="e.g. Under $20/week" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Prep Time (minutes)</label>
          <input type="number" value={prepTime} onChange={(e) => setPrepTime(Number(e.target.value))} className={inputClass} min={5} max={180} />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent">Back</button>
        <button
          onClick={() => onSubmit({ goal, ingredientsToInclude: includes, ingredientsToExclude: excludes, budget, prepTimeMinutes: prepTime })}
          disabled={!goal || !budget || isLoading}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm disabled:opacity-50"
        >
          {isLoading ? "Checking safety..." : "Run Safety Check"}
        </button>
      </div>
    </div>
  );
}
