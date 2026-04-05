package com.pawfectbite.server.knowledge.repository;

import com.pawfectbite.server.knowledge.domain.NutritionGuidance;

import java.util.List;

public interface NutritionGuidanceRepository {
    List<NutritionGuidance> findBySpecies(String species);
    List<NutritionGuidance> searchByEmbedding(float[] embedding, int limit);
}
