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
        String vectorString = toVectorString(embedding);
        return jpa.findNearestByEmbedding(vectorString, limit).stream()
                .map(NutritionGuidanceEntity::toDomain)
                .toList();
    }

    private String toVectorString(float[] embedding) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < embedding.length; i++) {
            if (i > 0) sb.append(",");
            sb.append(embedding[i]);
        }
        sb.append("]");
        return sb.toString();
    }
}
