"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PetWizard } from "@/components/pets/pet-wizard";
import { useCreatePet } from "@/lib/hooks/use-pets";
import { petsApi } from "@/lib/api/pets.api";
import type { PetFormValues } from "@/lib/schemas/pet.schema";

export default function NewPetPage() {
  const router = useRouter();
  const createPet = useCreatePet();
  const selectedPhoto = useRef<File | null>(null);

  const handleSubmit = async (data: PetFormValues) => {
    const pet = await createPet.mutateAsync(data);
    if (selectedPhoto.current && pet.id) {
      try {
        await petsApi.uploadPhoto(pet.id, selectedPhoto.current);
      } catch {
        // Pet created successfully; photo upload can be retried from edit page
      }
    }
    router.push("/pets");
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="w-16 h-16 bg-[#F7B2B7] rounded-2xl border-4 border-[#4A3B32] shadow-[4px_4px_0px_#4A3B32] flex items-center justify-center rotate-[-6deg]">
          <Plus className="w-8 h-8 text-white" strokeWidth={4} />
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight">Add New Pet</h1>
          <p className="text-lg font-medium text-[#4A3B32]/70">Tell us about your furry friend</p>
        </div>
      </motion.div>

      <PetWizard
        onSubmit={handleSubmit}
        onPhotoSelected={(file) => { selectedPhoto.current = file; }}
      />
    </div>
  );
}
