"use client";

import Link from "next/link";
import { DogIcon, CatIcon, ChevronRightIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Pet } from "@/lib/types/pet.types";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const Icon = pet.species === "DOG" ? DogIcon : CatIcon;

  return (
    <Link href={`/pets/${pet.id}`} className="group">
      <Card className="transition-colors hover:bg-accent/50">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium">{pet.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pet.breed} · {pet.ageYears}y {pet.ageMonths}m · {pet.weightKg}kg
            </p>
          </div>
          <ChevronRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
        </CardContent>
      </Card>
    </Link>
  );
}
