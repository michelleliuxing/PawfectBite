"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { usePet, useUpdatePet } from "@/lib/hooks/use-pets";
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

  if (isLoading) return <LoadingSpinner message="Loading pet..." color="yellow" />;
  if (error) return <ErrorAlert message="Failed to load pet" />;
  if (!pet) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="">
        <div className="flex items-center gap-4">
          <Link href={`/pets/${petId}`}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="w-12 h-12 bg-[#FFF9F2] rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-[#4A3B32]" strokeWidth={3} />
            </motion.div>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-[#4A3B32]">Edit {pet.name}</h1>
            <p className="text-[#4A3B32]/60 font-bold">Update your pet&apos;s profile</p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <PetForm defaultValues={pet} onSubmit={handleSubmit} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
