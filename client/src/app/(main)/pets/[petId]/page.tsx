"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { usePet, useDeletePet } from "@/lib/hooks/use-pets";
import { PetProfileSummary } from "@/components/pets/pet-profile-summary";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorAlert } from "@/components/shared/error-alert";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { motion } from "framer-motion";

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

  if (isLoading) return <LoadingSpinner message="Loading pet profile..." color="pink" />;
  if (error) return <ErrorAlert message="Failed to load pet" />;
  if (!pet) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ">
        <div className="flex items-center gap-4">
          <Link href="/pets">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="w-12 h-12 bg-[#FFF9F2] rounded-full border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-[#4A3B32]" strokeWidth={3} />
            </motion.div>
          </Link>
          <div>
            <h1 className="text-3xl font-black text-[#4A3B32]">{pet.name}&apos;s Profile</h1>
            <p className="text-[#4A3B32]/60 font-bold">Manage your pet&apos;s details</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link href={`/pets/${petId}/edit`} className="flex-1 md:flex-none">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
              className="flex items-center justify-center gap-2 bg-[#F4D06F] text-[#4A3B32] px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all"
            >
              <Pencil className="w-5 h-5" strokeWidth={3} />
              Edit
            </motion.div>
          </Link>
          
          <ConfirmDialog
            trigger={
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 2, boxShadow: "0px 0px 0px #4A3B32" }}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#E88D72] text-white px-6 py-3 rounded-full font-black border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] transition-all"
              >
                <Trash2 className="w-5 h-5" strokeWidth={3} />
                Delete
              </motion.button>
            }
            title="Delete Pet"
            description={`Are you sure you want to delete ${pet.name}? This action cannot be undone.`}
            confirmLabel="Delete"
            variant="destructive"
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <PetProfileSummary pet={pet} />
    </div>
  );
}
