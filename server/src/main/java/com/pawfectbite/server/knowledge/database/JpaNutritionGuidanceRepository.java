package com.pawfectbite.server.knowledge.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JpaNutritionGuidanceRepository extends JpaRepository<NutritionGuidanceEntity, UUID> {
    List<NutritionGuidanceEntity> findBySpeciesIgnoreCase(String species);

    List<NutritionGuidanceEntity> findByEmbeddingIsNull();

    @Modifying
    @Query(value = "UPDATE nutrition_guidance SET embedding = cast(:embedding as vector) WHERE id = :id", nativeQuery = true)
    void updateEmbedding(@Param("id") UUID id, @Param("embedding") String embedding);

    @Query(value = """
            SELECT * FROM nutrition_guidance
            WHERE embedding IS NOT NULL
            ORDER BY embedding <=> cast(:queryEmbedding as vector)
            LIMIT :limit
            """, nativeQuery = true)
    List<NutritionGuidanceEntity> findNearestByEmbedding(
            @Param("queryEmbedding") String queryEmbedding,
            @Param("limit") int limit);
}
