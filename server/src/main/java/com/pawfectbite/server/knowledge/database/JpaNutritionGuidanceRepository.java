package com.pawfectbite.server.knowledge.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaNutritionGuidanceRepository extends JpaRepository<NutritionGuidanceEntity, UUID> {
    List<NutritionGuidanceEntity> findBySpeciesIgnoreCase(String species);
}
