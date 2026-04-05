"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { petsApi } from "@/lib/api/pets.api";
import type { CreatePetRequest, UpdatePetRequest } from "@/lib/types/pet.types";

const PETS_KEY = ["pets"] as const;

export function usePets() {
  return useQuery({
    queryKey: PETS_KEY,
    queryFn: petsApi.list,
  });
}

export function usePet(petId: string) {
  return useQuery({
    queryKey: [...PETS_KEY, petId],
    queryFn: () => petsApi.getById(petId),
    enabled: !!petId,
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePetRequest) => petsApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PETS_KEY }),
  });
}

export function useUpdatePet(petId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePetRequest) => petsApi.update(petId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PETS_KEY });
      queryClient.invalidateQueries({ queryKey: [...PETS_KEY, petId] });
    },
  });
}

export function useDeletePet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (petId: string) => petsApi.delete(petId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PETS_KEY }),
  });
}
