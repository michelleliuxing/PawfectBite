import { Dog, Cat } from "lucide-react";
import type { Pet } from "@/lib/types/pet.types";

interface PetProfileSummaryProps {
  pet: Pet;
}

export function PetProfileSummary({ pet }: PetProfileSummaryProps) {
  const Icon = pet.species === "DOG" ? Dog : Cat;

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

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center gap-4 pb-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-7" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{pet.name}</h2>
          <p className="text-sm text-muted-foreground capitalize">{pet.species.toLowerCase()}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {details.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
            <dd className="mt-0.5 text-sm capitalize">{value}</dd>
          </div>
        ))}
      </div>

      {(pet.allergies.length > 0 || pet.medicalConditions.length > 0 || pet.medications.length > 0) && (
        <div className="mt-4 flex flex-col gap-3 border-t pt-4">
          {pet.allergies.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Allergies</dt>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {pet.allergies.map((a) => (
                  <span key={a} className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">{a}</span>
                ))}
              </div>
            </div>
          )}
          {pet.medicalConditions.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Medical Conditions</dt>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {pet.medicalConditions.map((c) => (
                  <span key={c} className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-700">{c}</span>
                ))}
              </div>
            </div>
          )}
          {pet.medications.length > 0 && (
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Medications</dt>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {pet.medications.map((m) => (
                  <span key={m} className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-700">{m}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {(pet.healthGoal || pet.currentDiet) && (
        <div className="mt-4 grid gap-3 border-t pt-4 sm:grid-cols-2">
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
      )}
    </div>
  );
}
