package com.pawfectbite.server.pets.repository;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.pets.database.JpaPetRepository;
import com.pawfectbite.server.pets.database.PetEntity;
import com.pawfectbite.server.pets.domain.Pet;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class PetRepositoryImpl implements PetRepository {

    private final JpaPetRepository jpa;

    public PetRepositoryImpl(JpaPetRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public List<Pet> findByUserId(UUID userId) {
        return jpa.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(PetEntity::toDomain)
                .toList();
    }

    @Override
    public Optional<Pet> findById(UUID id) {
        return jpa.findById(id).map(PetEntity::toDomain);
    }

    @Override
    public Pet save(Pet pet) {
        PetEntity entity = new PetEntity();
        applyFields(entity, pet);
        entity.setUserId(pet.userId());
        return jpa.save(entity).toDomain();
    }

    @Override
    public Pet update(UUID id, Pet pet) {
        PetEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", id));
        applyFields(entity, pet);
        return jpa.save(entity).toDomain();
    }

    @Override
    public void delete(UUID id) {
        jpa.deleteById(id);
    }

    private void applyFields(PetEntity entity, Pet pet) {
        entity.setName(pet.name());
        entity.setSpecies(pet.species());
        entity.setBreed(pet.breed());
        entity.setAgeYears(pet.ageYears());
        entity.setAgeMonths(pet.ageMonths());
        entity.setSex(pet.sex());
        entity.setNeutered(pet.isNeutered());
        entity.setWeightKg(pet.weightKg());
        entity.setTargetWeightKg(pet.targetWeightKg());
        entity.setActivityLevel(pet.activityLevel());
        entity.setLivingEnvironment(pet.livingEnvironment());
        entity.setAllergies(pet.allergies());
        entity.setMedicalConditions(pet.medicalConditions());
        entity.setMedications(pet.medications());
        entity.setHealthGoal(pet.healthGoal());
        entity.setCurrentDiet(pet.currentDiet());
        entity.setFeedingFrequency(pet.feedingFrequency());
        entity.setPhotoUrl(pet.photoUrl());
    }
}
