"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { usePet, useDeletePet } from "@/lib/hooks/use-pets";
import { PageHeader } from "@/components/layout/page-header";
import { PetProfileSummary } from "@/components/pets/pet-profile-summary";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

export default function PetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const petId = params.petId as string;
  const { data: pet, isLoading, error } = usePet(petId);
  const deletePet = useDeletePet();

  const handleDelete = async () => {
    await deletePet.mutateAsync(petId);
    router.push("/pets");
  };

  if (isLoading) return <LoadingSpinner message="Loading pet profile..." />;
  if (error) return <ErrorAlert message="Failed to load pet" />;
  if (!pet) return null;

  return (
    <div>
      <PageHeader
        title={pet.name}
        description="Pet profile details"
        action={
          <div className="flex items-center gap-2">
            <Link
              href={`/pets/${petId}/edit`}
              className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Pencil className="size-4" />
              Edit
            </Link>
            <ConfirmDialog
              trigger={
                <button className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
                  <Trash2 className="size-4" />
                  Delete
                </button>
              }
              title="Delete Pet"
              description={`Are you sure you want to delete ${pet.name}? This action cannot be undone.`}
              confirmLabel="Delete"
              variant="destructive"
              onConfirm={handleDelete}
            />
          </div>
        }
      />
      <PetProfileSummary pet={pet} />
    </div>
  );
}
