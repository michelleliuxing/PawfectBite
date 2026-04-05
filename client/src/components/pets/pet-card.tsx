"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dog,
  Cat,
  ChevronRight,
  Scale,
  Activity,
  Home,
  Calendar,
  Heart,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import type { Pet } from "@/lib/types/pet.types";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const isDog = pet.species === "DOG";
  const themeStrip = isDog ? "bg-[#F4D06F]" : "bg-[#98C9A3]";
  const Icon = isDog ? Dog : Cat;
  const hasMedical =
    pet.allergies.length > 0 ||
    pet.medicalConditions.length > 0 ||
    pet.medications.length > 0;

  const detailTile = (
    label: string,
    value: string,
    icon: ReactNode,
    bg: string
  ) => (
    <div
      className={`${bg} rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] p-4 flex flex-col gap-2`}
    >
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#4A3B32]/55">
        {icon}
        {label}
      </div>
      <p className="text-lg font-black text-[#4A3B32] leading-tight">{value}</p>
    </div>
  );

  return (
    <Link href={`/pets/${pet.id}`} className="block w-full group">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="w-full bg-white rounded-[2.5rem] border-4 border-[#4A3B32] shadow-[10px_10px_0px_#4A3B32] overflow-hidden flex flex-col md:flex-row md:min-h-[320px]"
      >
        {/* Photo section — large, full width on mobile, left column on desktop */}
        <div
          className={`relative w-full md:w-[min(44%,420px)] shrink-0 min-h-[260px] sm:min-h-[300px] md:min-h-[320px] border-b-4 md:border-b-0 md:border-r-4 border-[#4A3B32] ${themeStrip}`}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(#4A3B32 2px, transparent 2px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center gap-5 py-8 px-6 sm:py-10 sm:px-8">
            <div className="relative aspect-square w-[min(100%,260px)] sm:w-[min(100%,288px)] rounded-full border-4 border-[#4A3B32] bg-[#FFF9F2] shadow-[6px_6px_0px_#4A3B32] overflow-hidden">
              {pet.photoUrl ? (
                <Image
                  src={pet.photoUrl}
                  alt={`${pet.name} photo`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 260px, 288px"
                  priority={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#FFF9F2]">
                  <Icon className="w-[45%] h-[45%] max-w-[7rem] max-h-[7rem] text-[#4A3B32]/35" strokeWidth={1.25} />
                </div>
              )}
            </div>
            <div className="pointer-events-none flex justify-center">
              <span className="inline-flex items-center gap-1.5 bg-white/95 px-4 py-2 rounded-full border-4 border-[#4A3B32] font-black text-sm text-[#4A3B32] shadow-[3px_3px_0px_#4A3B32]">
                {isDog ? "Dog" : "Cat"}
                <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-10 gap-6 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-3xl sm:text-4xl font-black text-[#4A3B32] tracking-tight truncate">
                {pet.name}
              </h2>
              <p className="mt-1 text-lg font-bold text-[#4A3B32]/65">{pet.breed}</p>
            </div>
            <span className="inline-flex items-center gap-2 self-start bg-[#F7B2B7] text-[#4A3B32] px-5 py-2.5 rounded-full font-black text-sm border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] shrink-0">
              View profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {detailTile(
              "Age",
              `${pet.ageYears}y ${pet.ageMonths}m`,
              <Calendar className="w-4 h-4 text-[#F7B2B7]" />,
              "bg-[#FFF9F2]"
            )}
            {detailTile(
              "Sex",
              `${pet.sex === "MALE" ? "Male" : "Female"}${pet.isNeutered ? " · Neutered" : ""}`,
              <Heart className="w-4 h-4 text-[#E88D72]" />,
              "bg-[#FFF9F2]"
            )}
            {detailTile(
              "Weight",
              pet.targetWeightKg != null
                ? `${pet.weightKg} kg → ${pet.targetWeightKg} kg goal`
                : `${pet.weightKg} kg`,
              <Scale className="w-4 h-4 text-[#98C9A3]" />,
              "bg-[#FFF9F2]"
            )}
            {detailTile(
              "Activity",
              pet.activityLevel.replace("_", " ").toLowerCase(),
              <Activity className="w-4 h-4 text-[#F7B2B7]" />,
              "bg-[#FFF9F2]"
            )}
            {detailTile(
              "Home",
              pet.livingEnvironment.charAt(0) +
                pet.livingEnvironment.slice(1).toLowerCase(),
              <Home className="w-4 h-4 text-[#F4D06F]" />,
              "bg-[#FFF9F2]"
            )}
          </div>

          {hasMedical && (
            <div className="rounded-2xl border-4 border-[#4A3B32] bg-[#FFF9F2] p-4 shadow-[4px_4px_0px_#4A3B32]">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-[#E88D72]" />
                <span className="text-sm font-black uppercase tracking-wider text-[#4A3B32]">
                  Health notes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pet.allergies.map((a) => (
                  <span
                    key={`a-${a}`}
                    className="bg-[#E88D72] text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]"
                  >
                    {a}
                  </span>
                ))}
                {pet.medicalConditions.map((c) => (
                  <span
                    key={`c-${c}`}
                    className="bg-[#F4D06F] text-[#4A3B32] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]"
                  >
                    {c}
                  </span>
                ))}
                {pet.medications.map((m) => (
                  <span
                    key={`m-${m}`}
                    className="bg-white text-[#4A3B32] px-3 py-1 rounded-full text-xs font-bold border-2 border-[#4A3B32]"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {pet.healthGoal && (
            <p className="text-sm font-bold text-[#4A3B32]/75 border-l-4 border-[#98C9A3] pl-4">
              <span className="font-black text-[#4A3B32]">Goal: </span>
              {pet.healthGoal}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
