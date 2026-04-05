"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label>Goal</Label>
        <Input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. Weight management, high protein, sensitive stomach"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Ingredients to Include</Label>
        <div className="flex gap-2">
          <Input
            value={includeInput}
            onChange={(e) => setIncludeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(includeInput, includes, setIncludes, setIncludeInput);
              }
            }}
            className="flex-1"
            placeholder="e.g. chicken, rice..."
          />
          <Button type="button" variant="secondary" onClick={() => addTag(includeInput, includes, setIncludes, setIncludeInput)}>
            Add
          </Button>
        </div>
        {includes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {includes.map((t, i) => (
              <Badge key={i} className="gap-1 rounded-full bg-emerald-500/10 pr-1 text-emerald-700 hover:bg-emerald-500/10">
                {t}
                <button onClick={() => removeTag(i, includes, setIncludes)} className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10">
                  <XIcon className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Ingredients to Exclude</Label>
        <div className="flex gap-2">
          <Input
            value={excludeInput}
            onChange={(e) => setExcludeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag(excludeInput, excludes, setExcludes, setExcludeInput);
              }
            }}
            className="flex-1"
            placeholder="e.g. beef, dairy..."
          />
          <Button type="button" variant="secondary" onClick={() => addTag(excludeInput, excludes, setExcludes, setExcludeInput)}>
            Add
          </Button>
        </div>
        {excludes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {excludes.map((t, i) => (
              <Badge key={i} className="gap-1 rounded-full bg-red-500/10 pr-1 text-red-700 hover:bg-red-500/10">
                {t}
                <button onClick={() => removeTag(i, excludes, setExcludes)} className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10">
                  <XIcon className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Budget</Label>
          <Input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="e.g. Under $20/week"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Prep Time (minutes)</Label>
          <Input
            type="number"
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            min={5}
            max={180}
          />
        </div>
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => onSubmit({ goal, ingredientsToInclude: includes, ingredientsToExclude: excludes, budget, prepTimeMinutes: prepTime })}
          disabled={!goal || !budget || isLoading}
        >
          {isLoading ? "Checking safety..." : "Run Safety Check"}
        </Button>
      </div>
    </div>
  );
}
