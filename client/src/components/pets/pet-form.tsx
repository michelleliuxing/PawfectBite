"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import { petFormSchema, type PetFormValues } from "@/lib/schemas/pet.schema";
import type { Pet } from "@/lib/types/pet.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const isNeutered = watch("isNeutered");

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Name</Label>
          <Input {...register("name")} placeholder="e.g. Buddy" />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Species</Label>
          <Select
            defaultValue={defaultValues?.species}
            onValueChange={(v) => setValue("species", v as PetFormValues["species"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="DOG">Dog</SelectItem>
                <SelectItem value="CAT">Cat</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.species && <p className="text-xs text-destructive">{errors.species.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Breed</Label>
          <Input {...register("breed")} placeholder="e.g. Golden Retriever" />
          {errors.breed && <p className="text-xs text-destructive">{errors.breed.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Sex</Label>
          <Select
            defaultValue={defaultValues?.sex}
            onValueChange={(v) => setValue("sex", v as PetFormValues["sex"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.sex && <p className="text-xs text-destructive">{errors.sex.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Age (years)</Label>
          <Input type="number" {...register("ageYears", { valueAsNumber: true })} min={0} max={30} />
          {errors.ageYears && <p className="text-xs text-destructive">{errors.ageYears.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Age (months)</Label>
          <Input type="number" {...register("ageMonths", { valueAsNumber: true })} min={0} max={11} />
          {errors.ageMonths && <p className="text-xs text-destructive">{errors.ageMonths.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Weight (kg)</Label>
          <Input type="number" step="0.1" {...register("weightKg", { valueAsNumber: true })} />
          {errors.weightKg && <p className="text-xs text-destructive">{errors.weightKg.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Target Weight (kg)</Label>
          <Input type="number" step="0.1" {...register("targetWeightKg", { valueAsNumber: true })} placeholder="Optional" />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Activity Level</Label>
          <Select
            defaultValue={defaultValues?.activityLevel}
            onValueChange={(v) => setValue("activityLevel", v as PetFormValues["activityLevel"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MODERATE">Moderate</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="VERY_HIGH">Very High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.activityLevel && <p className="text-xs text-destructive">{errors.activityLevel.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Living Environment</Label>
          <Select
            defaultValue={defaultValues?.livingEnvironment}
            onValueChange={(v) => setValue("livingEnvironment", v as PetFormValues["livingEnvironment"])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="INDOOR">Indoor</SelectItem>
                <SelectItem value="OUTDOOR">Outdoor</SelectItem>
                <SelectItem value="BOTH">Both</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.livingEnvironment && <p className="text-xs text-destructive">{errors.livingEnvironment.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Feeding Frequency (per day)</Label>
          <Input type="number" {...register("feedingFrequency", { valueAsNumber: true })} min={1} max={6} />
          {errors.feedingFrequency && <p className="text-xs text-destructive">{errors.feedingFrequency.message}</p>}
        </div>

        <div className="flex items-center gap-3 self-end py-2">
          <Checkbox
            id="isNeutered"
            checked={!!isNeutered}
            onCheckedChange={(checked) => setValue("isNeutered", !!checked)}
          />
          <Label htmlFor="isNeutered">Neutered / Spayed</Label>
        </div>
      </div>

      {(
        [
          { field: "allergies" as const, inputKey: "allergy" as const, label: "Allergies", items: allergies },
          { field: "medicalConditions" as const, inputKey: "condition" as const, label: "Medical Conditions", items: medicalConditions },
          { field: "medications" as const, inputKey: "medication" as const, label: "Medications", items: medications },
        ] as const
      ).map(({ field, inputKey, label, items }) => (
        <div key={field} className="flex flex-col gap-1.5">
          <Label>{label}</Label>
          <div className="flex gap-2">
            <Input
              value={tagInputs[inputKey]}
              onChange={(e) => setTagInputs((prev) => ({ ...prev, [inputKey]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(field, inputKey);
                }
              }}
              className="flex-1"
              placeholder={`Add ${label.toLowerCase()}...`}
            />
            <Button type="button" variant="secondary" onClick={() => addTag(field, inputKey)}>
              Add
            </Button>
          </div>
          {items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {items.map((item, i) => (
                <Badge key={i} variant="secondary" className="gap-1 rounded-full pr-1">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeTag(field, i)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-foreground/10"
                  >
                    <XIcon className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label>Health Goal</Label>
          <Textarea
            {...register("healthGoal")}
            className="min-h-[80px] resize-none"
            placeholder="e.g. Weight management, improve coat"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Current Diet</Label>
          <Textarea
            {...register("currentDiet")}
            className="min-h-[80px] resize-none"
            placeholder="e.g. Dry kibble twice daily"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
