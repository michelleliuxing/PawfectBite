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

  if (isLoading) return <LoadingSpinner message="Loading your pets..." />;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Choose which pet this recipe is for:</p>
      {pets?.map((pet) => {
        const Icon = pet.species === "DOG" ? DogIcon : CatIcon;
        return (
          <Card
            key={pet.id}
            className="cursor-pointer transition-colors hover:bg-accent/50"
            onClick={() => onSelect(pet.id)}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-medium">{pet.name}</p>
                <p className="text-sm text-muted-foreground">{pet.breed} · {pet.weightKg}kg</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
