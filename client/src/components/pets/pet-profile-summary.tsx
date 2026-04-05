import { DogIcon, CatIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Pet } from "@/lib/types/pet.types";

interface PetProfileSummaryProps {
  pet: Pet;
}

export function PetProfileSummary({ pet }: PetProfileSummaryProps) {
  const Icon = pet.species === "DOG" ? DogIcon : CatIcon;

  const details = [
    { label: "Breed", value: pet.breed },
    { label: "Age", value: `${pet.ageYears}y ${pet.ageMonths}m` },
    { label: "Sex", value: `${pet.sex === "MALE" ? "Male" : "Female"}${pet.isNeutered ? " (neutered)" : ""}` },
    { label: "Weight", value: `${pet.weightKg} kg` },
    ...(pet.targetWeightKg ? [{ label: "Target Weight", value: `${pet.targetWeightKg} kg` }] : []),
    { label: "Activity", value: pet.activityLevel.replace("_", " ").toLowerCase() },
    { label: "Environment", value: pet.livingEnvironment.toLowerCase() },
    { label: "Feeding", value: `${pet.feedingFrequency}x daily` },
  ];

  const hasMedical = pet.allergies.length > 0 || pet.medicalConditions.length > 0 || pet.medications.length > 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-7" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{pet.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{pet.species.toLowerCase()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {details.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
              <dd className="mt-0.5 text-sm capitalize">{value}</dd>
            </div>
          ))}
        </div>

        {hasMedical && (
          <>
            <Separator />
            <div className="flex flex-col gap-3">
              {pet.allergies.length > 0 && (
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Allergies</dt>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {pet.allergies.map((a) => (
                      <Badge key={a} variant="destructive" className="rounded-full font-normal">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {pet.medicalConditions.length > 0 && (
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Medical Conditions</dt>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {pet.medicalConditions.map((c) => (
                      <Badge key={c} variant="secondary" className="rounded-full font-normal">
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {pet.medications.length > 0 && (
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Medications</dt>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {pet.medications.map((m) => (
                      <Badge key={m} variant="outline" className="rounded-full font-normal">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {(pet.healthGoal || pet.currentDiet) && (
          <>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              {pet.healthGoal && (
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Health Goal</dt>
                  <dd className="mt-0.5 text-sm">{pet.healthGoal}</dd>
                </div>
              )}
              {pet.currentDiet && (
                <div>
                  <dt className="text-xs font-medium text-muted-foreground">Current Diet</dt>
                  <dd className="mt-0.5 text-sm">{pet.currentDiet}</dd>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
