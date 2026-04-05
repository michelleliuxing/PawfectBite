"use client";

import Link from "next/link";
import { Plus, Dog } from "lucide-react";
import { usePets } from "@/lib/hooks/use-pets";
import { PetCard } from "@/components/pets/pet-card";
import { PageHeader } from "@/components/layout/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import { EmptyState } from "@/components/shared/empty-state";

export default function PetsPage() {
  const { data: pets, isLoading, error, refetch } = usePets();

  return (
    <div>
      <PageHeader
        title="My Pets"
        description="Manage your pet profiles"
        action={
          <Link
            href="/pets/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            Add Pet
          </Link>
        }
      />

      {isLoading && <LoadingSpinner message="Loading your pets..." />}

      {error && (
        <ErrorAlert
          message={error instanceof Error ? error.message : "Failed to load pets"}
          onRetry={() => refetch()}
        />
      )}

      {pets && pets.length === 0 && (
        <EmptyState
          icon={Dog}
          title="No pets yet"
          description="Add your first pet to start generating personalized meal recipes"
          action={
            <Link
              href="/pets/new"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm"
            >
              <Plus className="size-4" />
              Add Your First Pet
            </Link>
          }
        />
      )}

      {pets && pets.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}
