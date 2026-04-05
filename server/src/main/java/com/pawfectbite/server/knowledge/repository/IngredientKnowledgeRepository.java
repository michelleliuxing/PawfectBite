package com.pawfectbite.server.knowledge.repository;

import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;

import java.util.List;
import java.util.Optional;

public interface IngredientKnowledgeRepository {
    Optional<IngredientKnowledge> findByName(String name);
    List<IngredientKnowledge> findByNames(List<String> names);
    List<IngredientKnowledge> searchByEmbedding(float[] embedding, int limit);
}
