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
          <div className="flex flex-wrap gap-2 mt-2">
            {includes.map((t, i) => (
              <Badge key={i} className="gap-2 rounded-full border-4 border-[#4A3B32] bg-[#98C9A3] pr-1 pl-4 py-1 text-base font-bold text-white shadow-[2px_2px_0px_#4A3B32]">
                {t}
                <button onClick={() => removeTag(i, includes, setIncludes)} className="ml-1 rounded-full p-1 bg-white border-2 border-[#4A3B32] text-[#4A3B32] hover:bg-[#FFF9F2] transition-colors">
                  <XIcon className="size-4" strokeWidth={3} />
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
          <div className="flex flex-wrap gap-2 mt-2">
            {excludes.map((t, i) => (
              <Badge key={i} className="gap-2 rounded-full border-4 border-[#4A3B32] bg-[#F7B2B7] pr-1 pl-4 py-1 text-base font-bold text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32]">
                {t}
                <button onClick={() => removeTag(i, excludes, setExcludes)} className="ml-1 rounded-full p-1 bg-white border-2 border-[#4A3B32] text-[#4A3B32] hover:bg-[#FFF9F2] transition-colors">
                  <XIcon className="size-4" strokeWidth={3} />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={() => onSubmit({ goal, ingredientsToInclude: includes, ingredientsToExclude: excludes })}
          disabled={!goal || isLoading}
        >
          {isLoading ? "Checking safety..." : "Run Safety Check"}
        </Button>
      </div>
    </div>
  );
}
