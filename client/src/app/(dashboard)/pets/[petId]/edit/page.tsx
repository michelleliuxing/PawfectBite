"use client";

import { useParams, useRouter } from "next/navigation";
import { usePet, useUpdatePet } from "@/lib/hooks/use-pets";
import { PageHeader } from "@/components/layout/page-header";
import { PetForm } from "@/components/pets/pet-form";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import type { PetFormValues } from "@/lib/schemas/pet.schema";

export default function EditPetPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params.petId as string;
  const { data: pet, isLoading, error } = usePet(petId);
  const updatePet = useUpdatePet(petId);

  const handleSubmit = async (data: PetFormValues) => {
    await updatePet.mutateAsync(data);
    router.push(`/pets/${petId}`);
  };

  if (isLoading) return <LoadingSpinner message="Loading pet..." />;
  if (error) return <ErrorAlert message="Failed to load pet" />;
  if (!pet) return null;

  return (
    <div>
      <PageHeader title={`Edit ${pet.name}`} description="Update your pet's profile" />
      <div className="mx-auto max-w-2xl">
        <PetForm defaultValues={pet} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
