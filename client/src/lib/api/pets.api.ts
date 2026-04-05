import { apiClient } from "./client";
import type { Pet, CreatePetRequest, UpdatePetRequest } from "@/lib/types/pet.types";

export const petsApi = {
  list: () => apiClient.get<Pet[]>("/api/pets"),

  getById: (petId: string) => apiClient.get<Pet>(`/api/pets/${petId}`),

  create: (data: CreatePetRequest) => apiClient.post<Pet>("/api/pets", data),

  update: (petId: string, data: UpdatePetRequest) =>
    apiClient.put<Pet>(`/api/pets/${petId}`, data),

  delete: (petId: string) => apiClient.delete<void>(`/api/pets/${petId}`),
};
