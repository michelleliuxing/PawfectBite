package com.pawfectbite.server.knowledge.database;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaIngredientKnowledgeRepository extends JpaRepository<IngredientKnowledgeEntity, UUID> {
    Optional<IngredientKnowledgeEntity> findByNameIgnoreCase(String name);
    List<IngredientKnowledgeEntity> findByNameIgnoreCaseIn(List<String> names);
}
