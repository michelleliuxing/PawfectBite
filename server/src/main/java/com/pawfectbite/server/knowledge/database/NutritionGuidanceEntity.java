package com.pawfectbite.server.knowledge.database;

import com.pawfectbite.server.infrastructure.persistence.AuditableEntity;
import com.pawfectbite.server.knowledge.domain.NutritionGuidance;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "nutrition_guidance")
public class NutritionGuidanceEntity extends AuditableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 500)
    private String title;

    private String category;
    private String species;

    @Column(name = "content_text", nullable = false, columnDefinition = "TEXT")
    private String contentText;

    @Column(length = 500)
    private String source;

    @Column(name = "embedding", columnDefinition = "vector(1536)")
    private String embedding;

    public NutritionGuidanceEntity() {}

    public NutritionGuidance toDomain() {
        return new NutritionGuidance(id, title, category, species, contentText, source);
    }

    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getContentText() { return contentText; }
    public String getEmbedding() { return embedding; }
    public void setEmbedding(String embedding) { this.embedding = embedding; }
}
