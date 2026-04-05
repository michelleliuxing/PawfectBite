"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petFormSchema, type PetFormValues } from "@/lib/schemas/pet.schema";
import type { Pet } from "@/lib/types/pet.types";
import { useState } from "react";

interface PetFormProps {
  defaultValues?: Pet;
  onSubmit: (data: PetFormValues) => Promise<void>;
  submitLabel: string;
}

export function PetForm({ defaultValues, onSubmit, submitLabel }: PetFormProps) {
  const [tagInputs, setTagInputs] = useState({
    allergy: "",
    condition: "",
    medication: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(petFormSchema) as any,
    defaultValues: defaultValues
      ? {
          name: defaultValues.name,
          species: defaultValues.species,
          breed: defaultValues.breed,
          ageYears: defaultValues.ageYears,
          ageMonths: defaultValues.ageMonths,
          sex: defaultValues.sex,
          isNeutered: defaultValues.isNeutered,
          weightKg: defaultValues.weightKg,
          targetWeightKg: defaultValues.targetWeightKg,
          activityLevel: defaultValues.activityLevel,
          livingEnvironment: defaultValues.livingEnvironment,
          allergies: defaultValues.allergies,
          medicalConditions: defaultValues.medicalConditions,
          medications: defaultValues.medications,
          healthGoal: defaultValues.healthGoal,
          currentDiet: defaultValues.currentDiet,
          feedingFrequency: defaultValues.feedingFrequency,
        }
      : {
          ageYears: 0,
          ageMonths: 0,
          isNeutered: false,
          feedingFrequency: 2,
          allergies: [],
          medicalConditions: [],
          medications: [],
        },
  });

  const allergies = watch("allergies") ?? [];
  const medicalConditions = watch("medicalConditions") ?? [];
  const medications = watch("medications") ?? [];

  const addTag = (field: "allergies" | "medicalConditions" | "medications", inputKey: keyof typeof tagInputs) => {
    const value = tagInputs[inputKey].trim();
    if (!value) return;
    const current = watch(field) ?? [];
    if (!current.includes(value)) {
      setValue(field, [...current, value]);
    }
    setTagInputs((prev) => ({ ...prev, [inputKey]: "" }));
  };

  const removeTag = (field: "allergies" | "medicalConditions" | "medications", index: number) => {
    const current = watch(field) ?? [];
    setValue(field, current.filter((_, i) => i !== index));
  };

  const fieldClass = "flex flex-col gap-1.5";
  const labelClass = "text-sm font-medium";
  const inputClass = "rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";
  const selectClass = "rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2";
  const errorClass = "text-xs text-destructive";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass}>Name</label>
          <input {...register("name")} className={inputClass} placeholder="e.g. Buddy" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Species</label>
          <select {...register("species")} className={selectClass}>
            <option value="">Select...</option>
            <option value="DOG">Dog</option>
            <option value="CAT">Cat</option>
          </select>
          {errors.species && <p className={errorClass}>{errors.species.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Breed</label>
          <input {...register("breed")} className={inputClass} placeholder="e.g. Golden Retriever" />
          {errors.breed && <p className={errorClass}>{errors.breed.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Sex</label>
          <select {...register("sex")} className={selectClass}>
            <option value="">Select...</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex && <p className={errorClass}>{errors.sex.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Age (years)</label>
          <input type="number" {...register("ageYears")} className={inputClass} min={0} max={30} />
          {errors.ageYears && <p className={errorClass}>{errors.ageYears.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Age (months)</label>
          <input type="number" {...register("ageMonths")} className={inputClass} min={0} max={11} />
          {errors.ageMonths && <p className={errorClass}>{errors.ageMonths.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Weight (kg)</label>
          <input type="number" step="0.1" {...register("weightKg")} className={inputClass} />
          {errors.weightKg && <p className={errorClass}>{errors.weightKg.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Target Weight (kg)</label>
          <input type="number" step="0.1" {...register("targetWeightKg")} className={inputClass} placeholder="Optional" />
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Activity Level</label>
          <select {...register("activityLevel")} className={selectClass}>
            <option value="">Select...</option>
            <option value="LOW">Low</option>
            <option value="MODERATE">Moderate</option>
            <option value="HIGH">High</option>
            <option value="VERY_HIGH">Very High</option>
          </select>
          {errors.activityLevel && <p className={errorClass}>{errors.activityLevel.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Living Environment</label>
          <select {...register("livingEnvironment")} className={selectClass}>
            <option value="">Select...</option>
            <option value="INDOOR">Indoor</option>
            <option value="OUTDOOR">Outdoor</option>
            <option value="BOTH">Both</option>
          </select>
          {errors.livingEnvironment && <p className={errorClass}>{errors.livingEnvironment.message}</p>}
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Feeding Frequency (per day)</label>
          <input type="number" {...register("feedingFrequency")} className={inputClass} min={1} max={6} />
          {errors.feedingFrequency && <p className={errorClass}>{errors.feedingFrequency.message}</p>}
        </div>

        <div className="flex items-center gap-3 self-end">
          <input type="checkbox" {...register("isNeutered")} id="isNeutered" className="size-4 rounded border" />
          <label htmlFor="isNeutered" className={labelClass}>Neutered / Spayed</label>
        </div>
      </div>

      {/* Tag fields */}
      {([
        { field: "allergies" as const, inputKey: "allergy" as const, label: "Allergies", items: allergies },
        { field: "medicalConditions" as const, inputKey: "condition" as const, label: "Medical Conditions", items: medicalConditions },
        { field: "medications" as const, inputKey: "medication" as const, label: "Medications", items: medications },
      ]).map(({ field, inputKey, label, items }) => (
        <div key={field} className={fieldClass}>
          <label className={labelClass}>{label}</label>
          <div className="flex gap-2">
            <input
              value={tagInputs[inputKey]}
              onChange={(e) => setTagInputs((prev) => ({ ...prev, [inputKey]: e.target.value }))}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(field, inputKey); } }}
              className={inputClass + " flex-1"}
              placeholder={`Add ${label.toLowerCase()}...`}
            />
            <button
              type="button"
              onClick={() => addTag(field, inputKey)}
              className="rounded-md bg-secondary px-3 py-2 text-sm font-medium hover:bg-secondary/80"
            >
              Add
            </button>
          </div>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {item}
                  <button type="button" onClick={() => removeTag(field, i)} className="ml-1 text-muted-foreground hover:text-foreground">&times;</button>
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={fieldClass}>
          <label className={labelClass}>Health Goal</label>
          <textarea {...register("healthGoal")} className={inputClass + " min-h-[80px] resize-none"} placeholder="e.g. Weight management, improve coat" />
        </div>
        <div className={fieldClass}>
          <label className={labelClass}>Current Diet</label>
          <textarea {...register("currentDiet")} className={inputClass + " min-h-[80px] resize-none"} placeholder="e.g. Dry kibble twice daily" />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
