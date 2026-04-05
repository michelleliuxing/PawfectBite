"use client";

import { DogIcon, CatIcon, Activity, HeartPulse, Scale, Home, Info } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Pet } from "@/lib/types/pet.types";

interface PetProfileSummaryProps {
  pet: Pet;
}

export function PetProfileSummary({ pet }: PetProfileSummaryProps) {
  const isDog = pet.species === "DOG";
  const Icon = isDog ? DogIcon : CatIcon;
  const themeColor = isDog ? "bg-[#F4D06F]" : "bg-[#98C9A3]";

  const hasMedical = pet.allergies.length > 0 || pet.medicalConditions.length > 0 || pet.medications.length > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[3rem] border-4 border-[#4A3B32] shadow-[12px_12px_0px_#4A3B32] overflow-hidden"
    >
      {/* Header Section */}
      <div className={`${themeColor} p-8 md:p-10 border-b-4 border-[#4A3B32] relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4A3B32 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 bg-white rounded-[2rem] border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] flex items-center justify-center rotate-[-3deg] overflow-hidden relative">
            {pet.photoUrl ? (
              <Image src={pet.photoUrl} alt={pet.name} fill className="object-cover" />
            ) : (
              <Icon className="w-12 h-12 text-[#4A3B32]" />
            )}
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-4xl font-black text-[#4A3B32] mb-2">{pet.name}</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <span className="bg-white/60 px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm">
                {pet.breed}
              </span>
              <span className="bg-white/60 px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm">
                {pet.ageYears}y {pet.ageMonths}m
              </span>
              <span className="bg-white/60 px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm">
                {pet.sex === "MALE" ? "Male" : "Female"} {pet.isNeutered && "(Neutered)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 md:p-10 flex flex-col gap-10">
        
        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFF9F2] p-4 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex flex-col items-center text-center">
            <Scale className="w-6 h-6 text-[#E88D72] mb-2" />
            <span className="text-xs font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-1">Weight</span>
            <span className="font-black text-lg">{pet.weightKg} kg</span>
            {pet.targetWeightKg && (
              <span className="text-xs font-bold text-[#98C9A3] mt-1">Target: {pet.targetWeightKg} kg</span>
            )}
          </div>
          
          <div className="bg-[#FFF9F2] p-4 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex flex-col items-center text-center">
            <Activity className="w-6 h-6 text-[#F7B2B7] mb-2" />
            <span className="text-xs font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-1">Activity</span>
            <span className="font-black text-lg capitalize">{pet.activityLevel.replace("_", " ").toLowerCase()}</span>
          </div>

          <div className="bg-[#FFF9F2] p-4 rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex flex-col items-center text-center">
            <Home className="w-6 h-6 text-[#98C9A3] mb-2" />
            <span className="text-xs font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-1">Environment</span>
            <span className="font-black text-lg capitalize">{pet.livingEnvironment.toLowerCase()}</span>
          </div>
        </div>

        {/* Health & Medical Section */}
        {hasMedical && (
          <div className="bg-[#FFF9F2] p-6 md:p-8 rounded-[2rem] border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#F7B2B7] rounded-xl border-4 border-[#4A3B32] flex items-center justify-center rotate-[-5deg]">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black">Health Profile</h3>
            </div>

            <div className="flex flex-col gap-6">
              {pet.allergies.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-3">Allergies</h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.allergies.map((a) => (
                      <span key={a} className="bg-[#E88D72] text-white px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm shadow-[2px_2px_0px_#4A3B32]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pet.medicalConditions.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-3">Medical Conditions</h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.medicalConditions.map((c) => (
                      <span key={c} className="bg-[#F4D06F] text-[#4A3B32] px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm shadow-[2px_2px_0px_#4A3B32]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {pet.medications.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-3">Medications</h4>
                  <div className="flex flex-wrap gap-2">
                    {pet.medications.map((m) => (
                      <span key={m} className="bg-white text-[#4A3B32] px-4 py-1.5 rounded-full border-2 border-[#4A3B32] font-bold text-sm shadow-[2px_2px_0px_#4A3B32]">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Goals & Diet Section */}
        {pet.healthGoal && (
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-[#98C9A3]/20 p-6 rounded-[2rem] border-4 border-[#4A3B32] shadow-[6px_6px_0px_#4A3B32] relative">
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#98C9A3] rounded-xl border-4 border-[#4A3B32] flex items-center justify-center rotate-[10deg]">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-sm font-bold text-[#4A3B32]/60 uppercase tracking-wider mb-2">Health Goal</h4>
              <p className="font-bold leading-relaxed">{pet.healthGoal}</p>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
