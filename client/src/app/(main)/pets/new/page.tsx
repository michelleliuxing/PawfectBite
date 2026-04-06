"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { PetWizard } from "@/components/pets/pet-wizard";
import { useCreatePet } from "@/lib/hooks/use-pets";
import { petsApi } from "@/lib/api/pets.api";
import type { PetFormValues } from "@/lib/schemas/pet.schema";
import { useSession } from "next-auth/react";

import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function NewPetPage() {
  const router = useRouter();
  const { status } = useSession();
  const createPet = useCreatePet();
  const selectedPhoto = useRef<File | null>(null);
  const [defaultValues, setDefaultValues] = useState<Partial<PetFormValues> | undefined>();
  const [isRestoring, setIsRestoring] = useState(true);
  const [isAutoSubmitting, setIsAutoSubmitting] = useState(false);
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (status === "loading") return;

    const savedData = sessionStorage.getItem("pending_pet_data");
    
    if (savedData) {
      if (status === "authenticated" && !hasAutoSubmitted.current) {
        hasAutoSubmitted.current = true;
        setIsAutoSubmitting(true);
        try {
          const data = JSON.parse(savedData);
          sessionStorage.removeItem("pending_pet_data");
          
          createPet.mutateAsync(data)
            .then(() => {
              // We can't automatically upload the photo since File objects cannot be stored in sessionStorage
              // The user can add a photo later by editing the pet
              router.push("/pets");
            })
            .catch((error) => {
              console.error("Failed to create pet automatically", error);
              setIsAutoSubmitting(false);
              setIsRestoring(false);
            });
          return;
        } catch {
          console.error("Failed to parse pending pet data for auto-submit");
          sessionStorage.removeItem("pending_pet_data");
        }
      } else if (!hasAutoSubmitted.current) {
        try {
          setDefaultValues(JSON.parse(savedData));
          // Don't clear it here so that if they click save, it'll trigger login again if still unauthenticated. 
          // Actually, if we restore it, they are in step 1, they would need to go through steps again. 
          // They should probably just see their restored data.
          sessionStorage.removeItem("pending_pet_data");
        } catch {
          console.error("Failed to parse pending pet data");
        }
      }
    }
    
    setIsRestoring(false);
  }, [status, createPet, router]);

  const handleSubmit = async (data: PetFormValues) => {
    if (status !== "authenticated") {
      sessionStorage.setItem("pending_pet_data", JSON.stringify(data));
      router.push("/sign-in?callbackUrl=/pets/new");
      return;
    }

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

  if (isRestoring || isAutoSubmitting) {
    return (
      <LoadingSpinner 
        message={isAutoSubmitting ? "Creating pet profile..." : "Loading..."} 
        color="pink" 
        className="min-h-[500px]" 
      />
    );
  }

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
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onPhotoSelected={(file) => { selectedPhoto.current = file; }}
      />
    </div>
  );
}
