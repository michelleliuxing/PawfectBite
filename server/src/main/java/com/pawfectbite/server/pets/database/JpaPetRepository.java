package com.pawfectbite.server.pets.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaPetRepository extends JpaRepository<PetEntity, UUID> {
    List<PetEntity> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
