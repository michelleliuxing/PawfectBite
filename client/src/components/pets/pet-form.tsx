"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  XIcon, Plus, PawPrint, Dna, Calendar, Scale, Activity, 
  Home, HeartPulse, Pill, Target, 
  ShieldAlert, Tag, Heart, Check
} from "lucide-react";
import { motion } from "framer-motion";
import { petFormSchema, type PetFormValues } from "@/lib/schemas/pet.schema";
import type { Pet } from "@/lib/types/pet.types";
import { PetPhotoUpload } from "./pet-photo-upload";
import { useUploadPetPhoto, useDeletePetPhoto } from "@/lib/hooks/use-pets";

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
  const species = watch("species");
  const sex = watch("sex");
  const activityLevel = watch("activityLevel");
  const livingEnvironment = watch("livingEnvironment");

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

  const petId = defaultValues?.id;
  const uploadPhoto = useUploadPetPhoto(petId ?? "");
  const deletePhoto = useDeletePetPhoto(petId ?? "");

  const inputClasses = "w-full bg-[#FFF9F2] border-4 border-[#4A3B32] rounded-2xl px-4 py-3 font-bold text-[#4A3B32] focus:outline-none focus:ring-4 focus:ring-[#F4D06F]/50 transition-all placeholder:text-[#4A3B32]/40";
  const labelClasses = "text-sm font-black text-[#4A3B32] uppercase tracking-wider mb-2 flex items-center gap-2";
  const errorClasses = "text-xs font-bold text-[#E88D72] mt-2 bg-[#E88D72]/10 px-3 py-1 rounded-full inline-block border-2 border-[#E88D72]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 w-full">
      
      <div className="bg-white p-8 md:p-10 lg:p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4D06F]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#98C9A3]/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#F7B2B7]/20 rounded-full blur-3xl -z-10 transform -translate-x-1/2 -translate-y-1/2" />

        <div className="flex flex-col gap-8">

          {/* Photo Upload (available when editing an existing pet) */}
          {petId && (
            <div className="flex justify-center pb-4 border-b-4 border-[#4A3B32]/10">
              <PetPhotoUpload
                currentPhotoUrl={defaultValues?.photoUrl}
                onFileSelected={(file) => uploadPhoto.mutate(file)}
                onRemove={() => deletePhoto.mutate()}
                isUploading={uploadPhoto.isPending}
              />
            </div>
          )}

          {/* ROW 1: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <label className={labelClasses}><PawPrint className="w-5 h-5 text-[#E88D72]" /> Name</label>
              <input {...register("name")} className={inputClasses} placeholder="e.g. Buddy" />
              {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelClasses}><Dna className="w-5 h-5 text-[#98C9A3]" /> Species</label>
              <div className="flex gap-2">
                {(["DOG", "CAT"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("species", s)}
                    className={`flex-1 py-3 rounded-2xl font-black border-4 transition-all ${
                      species === s 
                        ? "bg-[#F4D06F] border-[#4A3B32] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] -translate-y-1" 
                        : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                    }`}
                  >
                    {s === "DOG" ? "Dog" : "Cat"}
                  </button>
                ))}
              </div>
              {errors.species && <p className={errorClasses}>{errors.species.message}</p>}
            </div>

            <div>
              <label className={labelClasses}><Tag className="w-5 h-5 text-[#F4D06F]" /> Breed</label>
              <input {...register("breed")} className={inputClasses} placeholder="e.g. Golden Retriever" />
              {errors.breed && <p className={errorClasses}>{errors.breed.message}</p>}
            </div>

            <div>
              <label className={labelClasses}><Heart className="w-5 h-5 text-[#F7B2B7]" /> Sex</label>
              <div className="flex gap-2">
                {(["MALE", "FEMALE"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setValue("sex", s)}
                    className={`flex-1 py-3 rounded-2xl font-black border-4 transition-all ${
                      sex === s 
                        ? "bg-[#98C9A3] border-[#4A3B32] text-white shadow-[4px_4px_0px_#4A3B32] -translate-y-1" 
                        : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                    }`}
                  >
                    {s === "MALE" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
              {errors.sex && <p className={errorClasses}>{errors.sex.message}</p>}
            </div>
          </div>

          {/* ROW 2: Age & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <label className={labelClasses}><Calendar className="w-5 h-5 text-[#4A3B32]/60" /> Age (years)</label>
              <input type="number" {...register("ageYears", { valueAsNumber: true })} min={0} max={30} className={inputClasses} />
              {errors.ageYears && <p className={errorClasses}>{errors.ageYears.message}</p>}
            </div>
            <div>
              <label className={labelClasses}><Calendar className="w-5 h-5 text-[#4A3B32]/60" /> Age (months)</label>
              <input type="number" {...register("ageMonths", { valueAsNumber: true })} min={0} max={11} className={inputClasses} />
              {errors.ageMonths && <p className={errorClasses}>{errors.ageMonths.message}</p>}
            </div>
            <div>
              <label className={labelClasses}><Scale className="w-5 h-5 text-[#E88D72]" /> Weight (kg)</label>
              <input type="number" step="0.1" min={0} {...register("weightKg", { valueAsNumber: true })} className={inputClasses} />
              {errors.weightKg && <p className={errorClasses}>{errors.weightKg.message}</p>}
            </div>
            <div>
              <label className={labelClasses}><Target className="w-5 h-5 text-[#98C9A3]" /> Target Weight (kg)</label>
              <input 
                type="number" 
                step="0.1" 
                min={0}
                {...register("targetWeightKg", { 
                  setValueAs: (v) => v === "" || Number.isNaN(Number(v)) ? undefined : Number(v) 
                })} 
                placeholder="Optional" 
                className={inputClasses} 
              />
            </div>
          </div>

          {/* ROW 3: Lifestyle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div>
              <label className={labelClasses}><Activity className="w-5 h-5 text-[#F7B2B7]" /> Activity Level</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["LOW", "MODERATE", "HIGH", "VERY_HIGH"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setValue("activityLevel", level)}
                    className={`py-3 px-1 rounded-2xl font-black border-4 transition-all text-xs sm:text-sm ${
                      activityLevel === level 
                        ? "bg-[#E88D72] border-[#4A3B32] text-white shadow-[4px_4px_0px_#4A3B32] -translate-y-1" 
                        : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                    }`}
                  >
                    {level.replace("_", " ")}
                  </button>
                ))}
              </div>
              {errors.activityLevel && <p className={errorClasses}>{errors.activityLevel.message}</p>}
            </div>

            <div>
              <label className={labelClasses}><Home className="w-5 h-5 text-[#F4D06F]" /> Living Environment</label>
              <div className="flex gap-2">
                {(["INDOOR", "OUTDOOR", "BOTH"] as const).map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => setValue("livingEnvironment", env)}
                    className={`flex-1 py-3 rounded-2xl font-black border-4 transition-all text-sm ${
                      livingEnvironment === env 
                        ? "bg-[#F7B2B7] border-[#4A3B32] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] -translate-y-1" 
                        : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
              {errors.livingEnvironment && <p className={errorClasses}>{errors.livingEnvironment.message}</p>}
            </div>
          </div>

          {/* ROW 4: Neutered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-4 cursor-pointer group w-full bg-[#FFF9F2] border-4 border-[#4A3B32] rounded-2xl px-4 py-2 hover:bg-[#F4D06F]/10 transition-colors">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    checked={!!isNeutered}
                    onChange={(e) => setValue("isNeutered", e.target.checked)}
                  />
                  <div className="w-8 h-8 bg-white border-4 border-[#4A3B32] rounded-xl peer-checked:bg-[#F7B2B7] transition-colors flex items-center justify-center shadow-[2px_2px_0px_#4A3B32] group-hover:-translate-y-0.5">
                    {isNeutered && <Check className="w-5 h-5 text-white" strokeWidth={4} />}
                  </div>
                </div>
                <span className="font-black text-lg text-[#4A3B32]">Neutered / Spayed</span>
              </label>
            </div>
          </div>

          <hr className="border-2 border-[#4A3B32]/10 rounded-full my-2" />

          {/* ROW 5: Health Tags */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {(
              [
                { field: "allergies" as const, inputKey: "allergy" as const, label: "Allergies", icon: ShieldAlert, iconColor: "text-[#E88D72]", items: allergies, color: "bg-[#E88D72]" },
                { field: "medicalConditions" as const, inputKey: "condition" as const, label: "Medical Conditions", icon: HeartPulse, iconColor: "text-[#F4D06F]", items: medicalConditions, color: "bg-[#F4D06F]" },
                { field: "medications" as const, inputKey: "medication" as const, label: "Medications", icon: Pill, iconColor: "text-[#98C9A3]", items: medications, color: "bg-white" },
              ] as const
            ).map(({ field, inputKey, label, icon: Icon, iconColor, items, color }) => (
              <div key={field}>
                <label className={labelClasses}><Icon className={`w-5 h-5 ${iconColor}`} /> {label}</label>
                <div className="flex gap-2 mb-3">
                  <input
                    value={tagInputs[inputKey]}
                    onChange={(e) => setTagInputs((prev) => ({ ...prev, [inputKey]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag(field, inputKey);
                      }
                    }}
                    className={`${inputClasses} px-3 py-2 text-sm`}
                    placeholder={`Add...`}
                  />
                  <motion.button 
                    type="button" 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
                    onClick={() => addTag(field, inputKey)}
                    className="bg-[#4A3B32] text-white px-4 rounded-xl font-black border-4 border-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] transition-all"
                  >
                    Add
                  </motion.button>
                </div>
                {items.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-[#FFF9F2] rounded-2xl border-4 border-[#4A3B32]/10 min-h-[60px]">
                    {items.map((item, i) => (
                      <span 
                        key={i} 
                        className={`${color} ${color === 'bg-white' || color === 'bg-[#F4D06F]' ? 'text-[#4A3B32]' : 'text-white'} px-3 py-1 rounded-full border-2 border-[#4A3B32] font-bold text-xs shadow-[2px_2px_0px_#4A3B32] flex items-center gap-1`}
                      >
                        {item}
                        <button
                          type="button"
                          onClick={() => removeTag(field, i)}
                          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                        >
                          <XIcon className="w-3 h-3" strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ROW 6: Textareas */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            <div>
              <label className={labelClasses}><Target className="w-5 h-5 text-[#F7B2B7]" /> Health Goal</label>
              <textarea
                {...register("healthGoal")}
                className={`${inputClasses} min-h-[100px] resize-none`}
                placeholder="e.g. Weight management, improve coat"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.05, y: -4, rotate: -1 } : {}}
          whileTap={!isSubmitting ? { scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" } : {}}
          className={`flex items-center gap-3 bg-[#F7B2B7] text-[#4A3B32] px-12 py-5 rounded-full font-black text-xl border-4 border-[#4A3B32] transition-all ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "shadow-[8px_8px_0px_#4A3B32]"
          }`}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-6 h-6" strokeWidth={3} />
          )}
          {isSubmitting ? "Saving..." : submitLabel}
        </motion.button>
      </div>
    </form>
  );
}
