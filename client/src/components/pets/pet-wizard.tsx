"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dog, Cat, Heart, PawPrint, Calendar, Scale, Target,
  Activity, Home, TreePine, Map, Check, ShieldAlert,
  HeartPulse, Pill, XIcon, ArrowRight, ArrowLeft, CheckCircle2
} from "lucide-react";
import { petFormSchema, type PetFormValues } from "@/lib/schemas/pet.schema";
import { PetPhotoUpload } from "./pet-photo-upload";

interface PetWizardProps {
  onSubmit: (data: PetFormValues) => Promise<void>;
  onPhotoSelected?: (file: File | null) => void;
  defaultValues?: Partial<PetFormValues>;
}

export function PetWizard({ onSubmit, onPhotoSelected, defaultValues }: PetWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
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
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<PetFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(petFormSchema) as any,
    defaultValues: {
      ageYears: 0,
      ageMonths: 0,
      isNeutered: false,
      feedingFrequency: 2,
      allergies: [],
      medicalConditions: [],
      medications: [],
      ...defaultValues,
    },
  });

  const species = watch("species");
  const sex = watch("sex");
  const activityLevel = watch("activityLevel");
  const livingEnvironment = watch("livingEnvironment");
  const isNeutered = watch("isNeutered");
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof PetFormValues)[] = [];
    if (currentStep === 1) {
      fieldsToValidate = ["name"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["species", "breed", "sex", "ageYears", "ageMonths", "isNeutered"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["weightKg", "targetWeightKg", "activityLevel", "livingEnvironment", "allergies", "medicalConditions", "medications", "healthGoal"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const inputClasses = "w-full bg-[#FFF9F2] border-4 border-[#4A3B32] rounded-2xl px-4 py-3 font-bold text-[#4A3B32] focus:outline-none focus:ring-4 focus:ring-[#F4D06F]/50 transition-all placeholder:text-[#4A3B32]/40";
  const labelClasses = "text-sm font-black text-[#4A3B32] uppercase tracking-wider mb-3 flex items-center gap-2";
  const errorClasses = "text-xs font-bold text-[#E88D72] mt-2 bg-[#E88D72]/10 px-3 py-1 rounded-full inline-block border-2 border-[#E88D72]";

  const formValues = watch();

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 flex items-center justify-between relative">
        {/* Lines Container */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 z-0">
          {/* Background dotted line */}
          <div className="w-full border-t-[6px] border-dotted border-[#4A3B32]/30" />
          {/* Active dotted line */}
          <div
            className="absolute top-0 left-0 border-t-[6px] border-dotted border-[#98C9A3] transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>

        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`relative z-10 w-12 h-12 rounded-full border-4 border-[#4A3B32] flex items-center justify-center font-black text-lg transition-colors duration-300 ${currentStep === step
                ? "bg-[#F4D06F] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] scale-110"
                : currentStep > step
                  ? "bg-[#98C9A3] text-white"
                  : "bg-white text-[#4A3B32]/40"
              }`}
          >
            {currentStep > step ? <CheckCircle2 className="w-6 h-6" strokeWidth={3} /> : step}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          if (currentStep < 4) {
            e.preventDefault();
            nextStep();
          } else {
            handleSubmit(onSubmit)(e);
          }
        }}
        className="bg-white p-8 md:p-12 rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] relative overflow-hidden min-h-[500px] flex flex-col"
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '24px 24px' }} />

        <div className="flex-1 relative z-10">
          <AnimatePresence mode="wait">

            {/* STEP 1: Basics */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-black text-[#4A3B32] mb-2">Who&apos;s the lucky pet?</h2>
                  <p className="text-[#4A3B32]/60 font-bold">Let&apos;s start with their name.</p>
                </div>

                <div className="flex flex-col gap-8">
                  {/* Photo */}
                  <div className="flex justify-center">
                    <PetPhotoUpload
                      onFileSelected={(file) => onPhotoSelected?.(file)}
                      onRemove={() => onPhotoSelected?.(null)}
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className={labelClasses}><PawPrint className="w-5 h-5 text-[#E88D72]" /> Pet&apos;s Name</label>
                    <input {...register("name")} className={`${inputClasses} text-xl py-4`} placeholder="e.g. Buddy" />
                    {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-black text-[#4A3B32] mb-2">More about {watch("name") || "them"}</h2>
                  <p className="text-[#4A3B32]/60 font-bold">Tell us a bit more.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Species */}
                  <div>
                    <label className={labelClasses}>Species</label>
                    <div className="flex gap-3">
                      {(["DOG", "CAT"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setValue("species", s)}
                          className={`flex-1 py-4 rounded-2xl font-black border-4 transition-all flex flex-col items-center gap-2 ${species === s
                              ? "bg-[#F4D06F] border-[#4A3B32] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] -translate-y-1"
                              : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                            }`}
                        >
                          {s === "DOG" ? <Dog className="w-8 h-8" /> : <Cat className="w-8 h-8" />}
                          {s === "DOG" ? "Dog" : "Cat"}
                        </button>
                      ))}
                    </div>
                    {errors.species && <p className={errorClasses}>{errors.species.message}</p>}
                  </div>

                  {/* Sex */}
                  <div>
                    <label className={labelClasses}>Sex</label>
                    <div className="flex gap-3">
                      {(["MALE", "FEMALE"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setValue("sex", s)}
                          className={`flex-1 py-4 rounded-2xl font-black border-4 transition-all flex flex-col items-center gap-2 ${sex === s
                              ? "bg-[#98C9A3] border-[#4A3B32] text-white shadow-[4px_4px_0px_#4A3B32] -translate-y-1"
                              : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                            }`}
                        >
                          <Heart className="w-8 h-8" strokeWidth={3} />
                          {s === "MALE" ? "Male" : "Female"}
                        </button>
                      ))}
                    </div>
                    {errors.sex && <p className={errorClasses}>{errors.sex.message}</p>}
                  </div>

                  {/* Breed */}
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Breed</label>
                    <input {...register("breed")} className={inputClasses} placeholder="e.g. Golden Retriever" />
                    {errors.breed && <p className={errorClasses}>{errors.breed.message}</p>}
                  </div>

                  {/* Age (Combined visually) */}
                  <div className="md:col-span-2">
                    <label className={labelClasses}><Calendar className="w-5 h-5 text-[#F7B2B7]" /> Age</label>
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <input type="number" {...register("ageYears", { valueAsNumber: true })} min={0} max={30} className={`${inputClasses} pr-16`} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[#4A3B32]/40">Yrs</span>
                      </div>
                      <div className="flex-1 relative">
                        <input type="number" {...register("ageMonths", { valueAsNumber: true })} min={0} max={11} className={`${inputClasses} pr-16`} />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[#4A3B32]/40">Mos</span>
                      </div>
                    </div>
                    {(errors.ageYears || errors.ageMonths) && (
                      <p className={errorClasses}>{errors.ageYears?.message || errors.ageMonths?.message}</p>
                    )}
                  </div>

                  {/* Neutered */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-4 cursor-pointer group w-full bg-[#FFF9F2] border-4 border-[#4A3B32] rounded-2xl px-6 py-4 hover:bg-[#F4D06F]/10 transition-colors">
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
              </motion.div>
            )}

            {/* STEP 3: Lifestyle & Health */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-black text-[#4A3B32] mb-2">Lifestyle & Health</h2>
                  <p className="text-[#4A3B32]/60 font-bold">Activity and special requirements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Weight */}
                  <div>
                    <label className={labelClasses}><Scale className="w-5 h-5 text-[#E88D72]" /> Current Weight</label>
                    <div className="relative">
                      <input type="number" step="0.1" min={0} {...register("weightKg", { valueAsNumber: true })} className={`${inputClasses} pr-12`} />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[#4A3B32]/40">kg</span>
                    </div>
                    {errors.weightKg && <p className={errorClasses}>{errors.weightKg.message}</p>}
                  </div>

                  {/* Target Weight */}
                  <div>
                    <label className={labelClasses}><Target className="w-5 h-5 text-[#98C9A3]" /> Target Weight (Optional)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        min={0}
                        {...register("targetWeightKg", {
                          setValueAs: (v) => v === "" || Number.isNaN(Number(v)) ? undefined : Number(v)
                        })}
                        className={`${inputClasses} pr-12`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[#4A3B32]/40">kg</span>
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div className="md:col-span-2">
                    <label className={labelClasses}><Activity className="w-5 h-5 text-[#F7B2B7]" /> Activity Level</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { val: "LOW", label: "Low", icon: Home },
                        { val: "MODERATE", label: "Moderate", icon: PawPrint },
                        { val: "HIGH", label: "High", icon: Activity },
                        { val: "VERY_HIGH", label: "Very High", icon: Target }
                      ].map((level) => (
                        <button
                          key={level.val}
                          type="button"
                          onClick={() => setValue("activityLevel", level.val as PetFormValues["activityLevel"])}
                          className={`py-4 px-2 rounded-2xl font-black border-4 transition-all flex flex-col items-center gap-2 ${activityLevel === level.val
                              ? "bg-[#E88D72] border-[#4A3B32] text-white shadow-[4px_4px_0px_#4A3B32] -translate-y-1"
                              : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                            }`}
                        >
                          <level.icon className="w-6 h-6" />
                          <span className="text-sm">{level.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.activityLevel && <p className={errorClasses}>{errors.activityLevel.message}</p>}
                  </div>

                  {/* Environment */}
                  <div className="md:col-span-2">
                    <label className={labelClasses}><Home className="w-5 h-5 text-[#F4D06F]" /> Living Environment</label>
                    <div className="flex gap-3">
                      {[
                        { val: "INDOOR", label: "Indoor", icon: Home },
                        { val: "OUTDOOR", label: "Outdoor", icon: TreePine },
                        { val: "BOTH", label: "Both", icon: Map }
                      ].map((env) => (
                        <button
                          key={env.val}
                          type="button"
                          onClick={() => setValue("livingEnvironment", env.val as PetFormValues["livingEnvironment"])}
                          className={`flex-1 py-4 rounded-2xl font-black border-4 transition-all flex flex-col items-center gap-2 ${livingEnvironment === env.val
                              ? "bg-[#F4D06F] border-[#4A3B32] text-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] -translate-y-1"
                              : "bg-[#FFF9F2] border-[#4A3B32]/20 text-[#4A3B32]/60 hover:border-[#4A3B32]/40"
                            }`}
                        >
                          <env.icon className="w-6 h-6" />
                          <span className="text-sm">{env.label}</span>
                        </button>
                      ))}
                    </div>
                    {errors.livingEnvironment && <p className={errorClasses}>{errors.livingEnvironment.message}</p>}
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-4 pt-8 border-t-4 border-[#4A3B32]/10">
                  <h3 className="text-xl font-black text-[#4A3B32] mb-2">Health Details</h3>
                  {(
                    [
                      { field: "allergies" as const, inputKey: "allergy" as const, label: "Allergies", icon: ShieldAlert, iconColor: "text-[#E88D72]", items: allergies, color: "bg-[#E88D72]" },
                      { field: "medicalConditions" as const, inputKey: "condition" as const, label: "Medical Conditions", icon: HeartPulse, iconColor: "text-[#F4D06F]", items: medicalConditions, color: "bg-[#F4D06F]" },
                      { field: "medications" as const, inputKey: "medication" as const, label: "Medications", icon: Pill, iconColor: "text-[#98C9A3]", items: medications, color: "bg-[#98C9A3]" },
                    ] as const
                  ).map(({ field, inputKey, label, icon: Icon, iconColor, items, color }) => (
                    <div key={field} className="bg-[#FFF9F2] p-6 rounded-3xl border-4 border-[#4A3B32]/10">
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
                          className={`${inputClasses} px-3 py-2 text-sm bg-white`}
                          placeholder={`Add ${label.toLowerCase()}...`}
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
                        <div className="flex flex-wrap gap-2 mt-4">
                          {items.map((item, i) => (
                            <span
                              key={i}
                              className={`${color} ${color === 'bg-[#F4D06F]' ? 'text-[#4A3B32]' : 'text-white'} px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm shadow-[2px_2px_0px_#4A3B32] flex items-center gap-2`}
                            >
                              {item}
                              <button
                                type="button"
                                onClick={() => removeTag(field, i)}
                                className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
                              >
                                <XIcon className="w-4 h-4" strokeWidth={3} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-2">
                    <label className={labelClasses}><Target className="w-5 h-5 text-[#F7B2B7]" /> Health Goal</label>
                    <textarea
                      {...register("healthGoal")}
                      className={`${inputClasses} min-h-[100px] resize-none`}
                      placeholder="e.g. Weight management, improve coat"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Overview */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-black text-[#4A3B32] mb-2">Looking Good!</h2>
                  <p className="text-[#4A3B32]/60 font-bold">Review {formValues.name || "your pet"}&apos;s profile before saving.</p>
                </div>

                <div className="bg-[#FFF9F2] p-6 md:p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] flex flex-col gap-6">
                  <div className="flex items-center gap-4 border-b-4 border-[#4A3B32]/10 pb-6">
                    <div className={`w-16 h-16 rounded-2xl border-4 border-[#4A3B32] flex items-center justify-center rotate-[-3deg] shadow-[4px_4px_0px_#4A3B32] ${formValues.species === 'DOG' ? 'bg-[#F4D06F]' : 'bg-[#98C9A3]'}`}>
                      {formValues.species === 'DOG' ? <Dog className="w-8 h-8 text-[#4A3B32]" /> : <Cat className="w-8 h-8 text-[#4A3B32]" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#4A3B32]">{formValues.name}</h3>
                      <p className="font-bold text-[#4A3B32]/60">{formValues.breed} • {formValues.sex === "MALE" ? "Male" : "Female"} {formValues.isNeutered && "(Neutered)"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider">Age</span>
                      <span className="font-bold text-[#4A3B32]">{formValues.ageYears}y {formValues.ageMonths}m</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider">Weight</span>
                      <span className="font-bold text-[#4A3B32]">{formValues.weightKg} kg {formValues.targetWeightKg ? `(Target: ${formValues.targetWeightKg})` : ''}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider">Activity</span>
                      <span className="font-bold text-[#4A3B32] capitalize">{formValues.activityLevel?.replace("_", " ").toLowerCase()}</span>
                    </div>
                  </div>

                  {((formValues.allergies && formValues.allergies.length > 0) ||
                    (formValues.medicalConditions && formValues.medicalConditions.length > 0) ||
                    (formValues.medications && formValues.medications.length > 0)) && (
                      <div className="flex flex-col gap-3 pt-4 border-t-4 border-[#4A3B32]/10">
                        {formValues.allergies && formValues.allergies.length > 0 && (
                          <div>
                            <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider block mb-1">Allergies</span>
                            <div className="flex flex-wrap gap-2">
                              {formValues.allergies.map((a: string) => <span key={a} className="bg-[#E88D72] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">{a}</span>)}
                            </div>
                          </div>
                        )}
                        {formValues.medicalConditions && formValues.medicalConditions.length > 0 && (
                          <div>
                            <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider block mb-1">Medical Conditions</span>
                            <div className="flex flex-wrap gap-2">
                              {formValues.medicalConditions.map((c: string) => <span key={c} className="bg-[#F4D06F] text-[#4A3B32] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">{c}</span>)}
                            </div>
                          </div>
                        )}
                        {formValues.medications && formValues.medications.length > 0 && (
                          <div>
                            <span className="text-xs font-black text-[#4A3B32]/50 uppercase tracking-wider block mb-1">Medications</span>
                            <div className="flex flex-wrap gap-2">
                              {formValues.medications.map((m: string) => <span key={m} className="bg-white text-[#4A3B32] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]">{m}</span>)}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 relative z-10">
          {currentStep > 1 ? (
            <motion.button
              key="btn-back"
              type="button"
              onClick={prevStep}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-2 bg-white text-[#4A3B32] px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all"
            >
              <ArrowLeft className="w-5 h-5" strokeWidth={3} />
              Back
            </motion.button>
          ) : (
            <div key="btn-spacer" /> // Empty div to keep 'Next' button on the right
          )}

          {currentStep < 4 ? (
            <motion.button
              key="btn-next"
              type="button"
              onClick={nextStep}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center gap-2 bg-[#F4D06F] text-[#4A3B32] px-8 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all"
            >
              Next
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </motion.button>
          ) : (
            <motion.button
              key="btn-submit"
              type="submit"
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05, y: -4, rotate: -1 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95, y: 4, boxShadow: "0px 0px 0px #4A3B32" } : {}}
              className={`flex items-center gap-3 bg-[#F7B2B7] text-[#4A3B32] px-10 py-4 rounded-full font-black text-lg border-4 border-[#4A3B32] transition-all ${isSubmitting ? "opacity-70 cursor-not-allowed" : "shadow-[6px_6px_0px_#4A3B32]"
                }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-4 border-[#4A3B32] border-t-white rounded-full animate-spin" />
              ) : (
                <CheckCircle2 className="w-6 h-6" strokeWidth={3} />
              )}
              {isSubmitting ? "Saving..." : "Save"}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
}
