package com.pawfectbite.server.knowledge.application;

import com.pawfectbite.server.infrastructure.openai.OpenAIClient;
import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;
import com.pawfectbite.server.knowledge.domain.NutritionGuidance;
import com.pawfectbite.server.knowledge.repository.IngredientKnowledgeRepository;
import com.pawfectbite.server.knowledge.repository.NutritionGuidanceRepository;
import com.pawfectbite.server.pets.domain.Pet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class KnowledgeRetrievalService {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeRetrievalService.class);
    private static final int MAX_INGREDIENT_RESULTS = 10;
    private static final int MAX_GUIDANCE_RESULTS = 5;

    private final IngredientKnowledgeRepository ingredientRepo;
    private final NutritionGuidanceRepository guidanceRepo;
    private final OpenAIClient openAIClient;

    public KnowledgeRetrievalService(
            IngredientKnowledgeRepository ingredientRepo,
            NutritionGuidanceRepository guidanceRepo,
            OpenAIClient openAIClient
    ) {
        this.ingredientRepo = ingredientRepo;
        this.guidanceRepo = guidanceRepo;
        this.openAIClient = openAIClient;
    }

    public record RetrievedKnowledge(
            List<IngredientKnowledge> ingredients,
            List<NutritionGuidance> guidance
    ) {}

    public RetrievedKnowledge retrieve(Pet pet, List<String> requestedIngredients, String goal) {
        // 1. Keyword-based lookup (exact name match)
        List<IngredientKnowledge> keywordIngredients = ingredientRepo.findByNames(requestedIngredients);
        log.info("Keyword match: {} ingredient records for names={}", keywordIngredients.size(), requestedIngredients);

        // 2. Semantic search via embeddings
        List<IngredientKnowledge> semanticIngredients = List.of();
        List<NutritionGuidance> semanticGuidance = List.of();

        try {
            String query = buildSemanticQuery(pet, requestedIngredients, goal);
            float[] queryEmbedding = openAIClient.generateEmbedding(query);

            semanticIngredients = ingredientRepo.searchByEmbedding(queryEmbedding, MAX_INGREDIENT_RESULTS);
            semanticGuidance = guidanceRepo.searchByEmbedding(queryEmbedding, MAX_GUIDANCE_RESULTS);

            log.info("Semantic search: {} ingredient records, {} guidance records",
                    semanticIngredients.size(), semanticGuidance.size());
        } catch (Exception e) {
            log.warn("Semantic search failed, falling back to keyword-only: {}", e.getMessage());
        }

        // 3. Merge keyword + semantic results (deduplicate by ID)
        List<IngredientKnowledge> mergedIngredients = mergeByKey(
                keywordIngredients, semanticIngredients, IngredientKnowledge::id);
        List<NutritionGuidance> mergedGuidance = semanticGuidance.isEmpty()
                ? guidanceRepo.findBySpecies(pet.species().name())
                : semanticGuidance;

        log.info("Final retrieval: {} ingredient records, {} guidance records for pet={}",
                mergedIngredients.size(), mergedGuidance.size(), pet.name());

        return new RetrievedKnowledge(mergedIngredients, mergedGuidance);
    }

    private String buildSemanticQuery(Pet pet, List<String> ingredients, String goal) {
        StringBuilder sb = new StringBuilder();
        sb.append(pet.species().name().toLowerCase()).append(" ");
        sb.append(goal).append(" ");
        if (!ingredients.isEmpty()) {
            sb.append("using ").append(String.join(", ", ingredients)).append(" ");
        }
        if (!pet.allergies().isEmpty()) {
            sb.append("allergies: ").append(String.join(", ", pet.allergies())).append(" ");
        }
        if (!pet.medicalConditions().isEmpty()) {
            sb.append("conditions: ").append(String.join(", ", pet.medicalConditions()));
        }
        return sb.toString().trim();
    }

    private <T> List<T> mergeByKey(List<T> primary, List<T> secondary, Function<T, UUID> keyExtractor) {
        Map<UUID, T> merged = new LinkedHashMap<>();
        for (T item : primary) {
            merged.put(keyExtractor.apply(item), item);
        }
        for (T item : secondary) {
            merged.putIfAbsent(keyExtractor.apply(item), item);
        }
        return new ArrayList<>(merged.values());
    }
}
