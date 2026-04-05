package com.pawfectbite.server.pets.repository;

import com.pawfectbite.server.pets.domain.Pet;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PetRepository {
    List<Pet> findByUserId(UUID userId);
    Optional<Pet> findById(UUID id);
    Pet save(Pet pet);
    Pet update(UUID id, Pet pet);
    void delete(UUID id);
}
