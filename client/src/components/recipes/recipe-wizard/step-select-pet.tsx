"use client";

import { DogIcon, CatIcon } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Card, CardContent } from "@/components/ui/card";

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
          <Card
            key={pet.id}
            className="cursor-pointer rounded-[2rem] border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#4A3B32]"
            onClick={() => onSelect(pet.id)}
          >
            <CardContent className="flex items-center gap-6 p-6">
              <div className="flex w-16 h-16 shrink-0 items-center justify-center rounded-full border-4 border-[#4A3B32] bg-[#F4D06F] text-[#4A3B32] shadow-[2px_2px_0px_#4A3B32]">
                <Icon className="w-8 h-8" strokeWidth={3} />
              </div>
              <div>
                <p className="text-2xl font-black text-[#4A3B32]">{pet.name}</p>
                <p className="text-lg font-bold text-[#4A3B32]/70">{pet.breed} · {pet.weightKg}kg</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
