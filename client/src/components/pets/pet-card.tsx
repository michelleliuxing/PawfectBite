"use client";

import Link from "next/link";
import { Dog, Cat, ChevronRight } from "lucide-react";
import type { Pet } from "@/lib/types/pet.types";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  const Icon = pet.species === "DOG" ? Dog : Cat;

  return (
    <Link
      href={`/pets/${pet.id}`}
      className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
    >
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-6" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-medium">{pet.name}</h3>
        <p className="text-sm text-muted-foreground">
          {pet.breed} · {pet.ageYears}y {pet.ageMonths}m · {pet.weightKg}kg
        </p>
      </div>
      <ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
