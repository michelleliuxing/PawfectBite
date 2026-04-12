package com.pawfectbite.server.knowledge.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaIngredientKnowledgeRepository extends JpaRepository<IngredientKnowledgeEntity, UUID> {
    Optional<IngredientKnowledgeEntity> findByNameIgnoreCase(String name);
    List<IngredientKnowledgeEntity> findByNameIgnoreCaseIn(List<String> names);

    List<IngredientKnowledgeEntity> findByEmbeddingIsNull();

    @Modifying
    @Query(value = "UPDATE ingredient_knowledge SET embedding = cast(:embedding as vector) WHERE id = :id", nativeQuery = true)
    void updateEmbedding(@Param("id") UUID id, @Param("embedding") String embedding);

    @Query(value = """
            SELECT * FROM ingredient_knowledge
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> cast(:queryEmbedding as vector)
            LIMIT :limit
            """, nativeQuery = true)
    List<IngredientKnowledgeEntity> findNearestByEmbedding(
            @Param("queryEmbedding") String queryEmbedding,
            @Param("limit") int limit);
}
