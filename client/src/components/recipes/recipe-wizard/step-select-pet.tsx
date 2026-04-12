"use client";

import { DogIcon, CatIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePets } from "@/lib/hooks/use-pets";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface StepSelectPetProps {
  onSelect: (petId: string) => void;
}

export function StepSelectPet({ onSelect }: StepSelectPetProps) {
  const { data: pets, isLoading } = usePets();

  if (isLoading) return <LoadingSpinner message="Loading your pets..." color="yellow" />;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold text-[#4A3B32]/70 mb-2">Choose which pet this recipe is for:</p>
      {pets?.map((pet) => {
        const Icon = pet.species === "DOG" ? DogIcon : CatIcon;
        return (
          <motion.button
            key={pet.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 0 }}
            className="flex items-center gap-6 p-6 text-left w-full cursor-pointer rounded-[2rem] border-4 border-[#4A3B32] bg-white shadow-[4px_4px_0px_#4A3B32] transition-all hover:shadow-[8px_8px_0px_#4A3B32] focus:outline-none"
            onClick={() => onSelect(pet.id)}
          >
            <div className="w-20 h-20 shrink-0 overflow-hidden rounded-full border-4 border-[#4A3B32] bg-[#FFF9F2] text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32] flex items-center justify-center">
              {pet.photoUrl ? (
                <Image
                  src={pet.photoUrl}
                  alt={pet.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon className="w-10 h-10" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-2xl font-black text-[#4A3B32] truncate">{pet.name}</p>
              <p className="text-lg font-bold text-[#4A3B32]/70 truncate">{pet.breed} · {pet.weightKg}kg</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
