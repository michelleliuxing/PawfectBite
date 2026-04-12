package com.pawfectbite.server.knowledge.application;

import com.pawfectbite.server.infrastructure.openai.OpenAIClient;
import com.pawfectbite.server.knowledge.database.IngredientKnowledgeEntity;
import com.pawfectbite.server.knowledge.database.JpaIngredientKnowledgeRepository;
import com.pawfectbite.server.knowledge.database.JpaNutritionGuidanceRepository;
import com.pawfectbite.server.knowledge.database.NutritionGuidanceEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmbeddingService {

    private static final Logger log = LoggerFactory.getLogger(EmbeddingService.class);

    private final OpenAIClient openAIClient;
    private final JpaIngredientKnowledgeRepository ingredientRepo;
    private final JpaNutritionGuidanceRepository guidanceRepo;

    public EmbeddingService(
            OpenAIClient openAIClient,
            JpaIngredientKnowledgeRepository ingredientRepo,
            JpaNutritionGuidanceRepository guidanceRepo
    ) {
        this.openAIClient = openAIClient;
        this.ingredientRepo = ingredientRepo;
        this.guidanceRepo = guidanceRepo;
    }

    public record EmbeddingResult(int ingredientsProcessed, int guidanceProcessed, int errors) {}

    @Transactional
    public EmbeddingResult embedAll() {
        int ingredientCount = embedIngredientKnowledge();
        int guidanceCount = embedNutritionGuidance();
        int errors = 0;

        log.info("Embedding complete: {} ingredients, {} guidance records",
                ingredientCount, guidanceCount);

        return new EmbeddingResult(ingredientCount, guidanceCount, errors);
    }

    private int embedIngredientKnowledge() {
        List<IngredientKnowledgeEntity> unembedded = ingredientRepo.findByEmbeddingIsNull();
        log.info("Found {} ingredient_knowledge records without embeddings", unembedded.size());

        int processed = 0;
        for (IngredientKnowledgeEntity entity : unembedded) {
            try {
                float[] embedding = openAIClient.generateEmbedding(entity.getContentText());
                ingredientRepo.updateEmbedding(entity.getId(), toVectorString(embedding));
                processed++;
                if (processed % 10 == 0) {
                    log.info("Embedded {}/{} ingredient_knowledge records", processed, unembedded.size());
                }
            } catch (Exception e) {
                log.error("Failed to embed ingredient_knowledge id={}, name={}: {}",
                        entity.getId(), entity.getName(), e.getMessage());
            }
        }
        return processed;
    }

    private int embedNutritionGuidance() {
        List<NutritionGuidanceEntity> unembedded = guidanceRepo.findByEmbeddingIsNull();
        log.info("Found {} nutrition_guidance records without embeddings", unembedded.size());

        int processed = 0;
        for (NutritionGuidanceEntity entity : unembedded) {
            try {
                float[] embedding = openAIClient.generateEmbedding(entity.getContentText());
                guidanceRepo.updateEmbedding(entity.getId(), toVectorString(embedding));
                processed++;
                if (processed % 10 == 0) {
                    log.info("Embedded {}/{} nutrition_guidance records", processed, unembedded.size());
                }
            } catch (Exception e) {
                log.error("Failed to embed nutrition_guidance id={}, title={}: {}",
                        entity.getId(), entity.getTitle(), e.getMessage());
            }
        }
        return processed;
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
