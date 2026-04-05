"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { PetForm } from "@/components/pets/pet-form";
import { useCreatePet } from "@/lib/hooks/use-pets";
import type { PetFormValues } from "@/lib/schemas/pet.schema";

export default function NewPetPage() {
  const router = useRouter();
  const createPet = useCreatePet();

  const handleSubmit = async (data: PetFormValues) => {
    await createPet.mutateAsync(data);
    router.push("/pets");
  };

  return (
    <div>
      <PageHeader title="Add New Pet" description="Fill in your pet's profile details" />
      <div className="mx-auto max-w-2xl">
        <PetForm onSubmit={handleSubmit} submitLabel="Create Pet" />
      </div>
    </div>
  );
}
