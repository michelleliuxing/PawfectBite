package com.pawfectbite.server.knowledge.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;
import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ingredient_knowledge")
public class IngredientKnowledgeEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String category;

    @Column(name = "safety_notes", columnDefinition = "TEXT")
    private String safetyNotes;

    @Column(name = "nutrition_info", columnDefinition = "TEXT")
    private String nutritionInfo;

    @Column(name = "content_text", nullable = false, columnDefinition = "TEXT")
    private String contentText;

    @Column(name = "embedding", columnDefinition = "vector(1536)")
    private String embedding;

    public IngredientKnowledgeEntity() {}

    public IngredientKnowledge toDomain() {
        return new IngredientKnowledge(id, name, category, List.of(), safetyNotes, nutritionInfo, contentText);
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getContentText() { return contentText; }
    public String getEmbedding() { return embedding; }
    public void setEmbedding(String embedding) { this.embedding = embedding; }
}
