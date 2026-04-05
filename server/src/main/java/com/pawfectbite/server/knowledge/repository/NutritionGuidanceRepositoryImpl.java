package com.pawfectbite.server.knowledge.repository;

import com.pawfectbite.server.knowledge.database.JpaNutritionGuidanceRepository;
import com.pawfectbite.server.knowledge.database.NutritionGuidanceEntity;
import com.pawfectbite.server.knowledge.domain.NutritionGuidance;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NutritionGuidanceRepositoryImpl implements NutritionGuidanceRepository {

    private final JpaNutritionGuidanceRepository jpa;

    public NutritionGuidanceRepositoryImpl(JpaNutritionGuidanceRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public List<NutritionGuidance> findBySpecies(String species) {
        return jpa.findBySpeciesIgnoreCase(species).stream()
                .map(NutritionGuidanceEntity::toDomain)
                .toList();
    }

    @Override
    public List<NutritionGuidance> searchByEmbedding(float[] embedding, int limit) {
        // Vector search will be implemented when pgvector native queries are added
        return List.of();
    }
}
