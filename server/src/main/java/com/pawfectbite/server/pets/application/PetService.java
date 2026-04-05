package com.pawfectbite.server.pets.application;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.pets.dto.CreatePetRequest;
import com.pawfectbite.server.pets.dto.UpdatePetRequest;
import com.pawfectbite.server.pets.repository.PetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> getPetsByUser(UUID userId) {
        return petRepository.findByUserId(userId);
    }

    public Pet getPetById(UUID petId) {
        return petRepository.findById(petId)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", petId));
    }

    @Transactional
    public Pet createPet(UUID userId, CreatePetRequest request) {
        Pet pet = new Pet(
                null, userId, request.name(), request.species(), request.breed(),
                request.ageYears(), request.ageMonths(), request.sex(), request.isNeutered(),
                request.weightKg(), request.targetWeightKg(), request.activityLevel(),
                request.livingEnvironment(),
                nullSafe(request.allergies()),
                nullSafe(request.medicalConditions()),
                nullSafe(request.medications()),
                request.healthGoal(), request.currentDiet(), request.feedingFrequency(),
                null, null
        );
        return petRepository.save(pet);
    }

    @Transactional
    public Pet updatePet(UUID petId, UUID userId, UpdatePetRequest request) {
        Pet existing = getPetById(petId);
        Pet updated = new Pet(
                existing.id(), userId, request.name(), request.species(), request.breed(),
                request.ageYears(), request.ageMonths(), request.sex(), request.isNeutered(),
                request.weightKg(), request.targetWeightKg(), request.activityLevel(),
                request.livingEnvironment(),
                nullSafe(request.allergies()),
                nullSafe(request.medicalConditions()),
                nullSafe(request.medications()),
                request.healthGoal(), request.currentDiet(), request.feedingFrequency(),
                existing.createdAt(), null
        );
        return petRepository.update(petId, updated);
    }

    @Transactional
    public void deletePet(UUID petId) {
        petRepository.delete(petId);
    }

    private <T> List<T> nullSafe(List<T> list) {
        return list != null ? list : Collections.emptyList();
    }
}
