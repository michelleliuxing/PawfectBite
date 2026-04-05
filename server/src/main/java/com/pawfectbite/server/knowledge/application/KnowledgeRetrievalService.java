package com.pawfectbite.server.knowledge.application;

import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;
import com.pawfectbite.server.knowledge.domain.NutritionGuidance;
import com.pawfectbite.server.knowledge.repository.IngredientKnowledgeRepository;
import com.pawfectbite.server.knowledge.repository.NutritionGuidanceRepository;
import com.pawfectbite.server.pets.domain.Pet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KnowledgeRetrievalService {

    private static final Logger log = LoggerFactory.getLogger(KnowledgeRetrievalService.class);

    private final IngredientKnowledgeRepository ingredientRepo;
    private final NutritionGuidanceRepository guidanceRepo;

    public KnowledgeRetrievalService(
            IngredientKnowledgeRepository ingredientRepo,
            NutritionGuidanceRepository guidanceRepo
    ) {
        this.ingredientRepo = ingredientRepo;
        this.guidanceRepo = guidanceRepo;
    }

    public record RetrievedKnowledge(
            List<IngredientKnowledge> ingredients,
            List<NutritionGuidance> guidance
    ) {}

    public RetrievedKnowledge retrieve(Pet pet, List<String> requestedIngredients) {
        List<IngredientKnowledge> ingredients = ingredientRepo.findByNames(requestedIngredients);
        List<NutritionGuidance> guidance = guidanceRepo.findBySpecies(pet.species().name());

        log.info("Retrieved {} ingredient records and {} guidance records for pet={}",
                ingredients.size(), guidance.size(), pet.name());

        return new RetrievedKnowledge(ingredients, guidance);
    }
}
