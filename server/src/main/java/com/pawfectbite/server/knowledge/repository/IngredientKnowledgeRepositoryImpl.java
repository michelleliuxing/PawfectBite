package com.pawfectbite.server.knowledge.repository;

import com.pawfectbite.server.knowledge.database.IngredientKnowledgeEntity;
import com.pawfectbite.server.knowledge.database.JpaIngredientKnowledgeRepository;
import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class IngredientKnowledgeRepositoryImpl implements IngredientKnowledgeRepository {

    private final JpaIngredientKnowledgeRepository jpa;

    public IngredientKnowledgeRepositoryImpl(JpaIngredientKnowledgeRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Optional<IngredientKnowledge> findByName(String name) {
        return jpa.findByNameIgnoreCase(name).map(IngredientKnowledgeEntity::toDomain);
    }

    @Override
    public List<IngredientKnowledge> findByNames(List<String> names) {
        if (names == null || names.isEmpty()) return List.of();
        return jpa.findByNameIgnoreCaseIn(names).stream()
                .map(IngredientKnowledgeEntity::toDomain)
                .toList();
    }

    @Override
    public List<IngredientKnowledge> searchByEmbedding(float[] embedding, int limit) {
        // Vector search will be implemented when pgvector native queries are added
        return List.of();
    }
}
