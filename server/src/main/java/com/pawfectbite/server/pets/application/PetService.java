package com.pawfectbite.server.pets.application;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.infrastructure.cloudinary.CloudinaryService;
import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.pets.dto.CreatePetRequest;
import com.pawfectbite.server.pets.dto.UpdatePetRequest;
import com.pawfectbite.server.pets.repository.PetRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final CloudinaryService cloudinaryService;

    public PetService(PetRepository petRepository, CloudinaryService cloudinaryService) {
        this.petRepository = petRepository;
        this.cloudinaryService = cloudinaryService;
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
                null, null, null
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
                existing.photoUrl(), existing.createdAt(), null
        );
        return petRepository.update(petId, updated);
    }

    @Transactional
    public Pet uploadPhoto(UUID petId, UUID userId, MultipartFile file) {
        Pet existing = getPetById(petId);
        String publicId = "pet-" + petId;
        String photoUrl = cloudinaryService.uploadPetPhoto(file, publicId);

        Pet updated = new Pet(
                existing.id(), existing.userId(), existing.name(), existing.species(),
                existing.breed(), existing.ageYears(), existing.ageMonths(), existing.sex(),
                existing.isNeutered(), existing.weightKg(), existing.targetWeightKg(),
                existing.activityLevel(), existing.livingEnvironment(), existing.allergies(),
                existing.medicalConditions(), existing.medications(), existing.healthGoal(),
                existing.currentDiet(), existing.feedingFrequency(), photoUrl,
                existing.createdAt(), null
        );
        return petRepository.update(petId, updated);
    }

    @Transactional
    public Pet deletePhoto(UUID petId) {
        Pet existing = getPetById(petId);
        if (existing.photoUrl() != null) {
            cloudinaryService.deletePetPhoto("pet-" + petId);
        }
        Pet updated = new Pet(
                existing.id(), existing.userId(), existing.name(), existing.species(),
                existing.breed(), existing.ageYears(), existing.ageMonths(), existing.sex(),
                existing.isNeutered(), existing.weightKg(), existing.targetWeightKg(),
                existing.activityLevel(), existing.livingEnvironment(), existing.allergies(),
                existing.medicalConditions(), existing.medications(), existing.healthGoal(),
                existing.currentDiet(), existing.feedingFrequency(), null,
                existing.createdAt(), null
        );
        return petRepository.update(petId, updated);
    }

    @Transactional
    public void deletePet(UUID petId) {
        Pet pet = getPetById(petId);
        if (pet.photoUrl() != null) {
            cloudinaryService.deletePetPhoto("pet-" + petId);
        }
        petRepository.delete(petId);
    }

    private <T> List<T> nullSafe(List<T> list) {
        return list != null ? list : Collections.emptyList();
    }
}
