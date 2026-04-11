package com.pawfectbite.server.recipes.application;

import com.pawfectbite.server.knowledge.application.KnowledgeRetrievalService;
import com.pawfectbite.server.knowledge.application.KnowledgeRetrievalService.RetrievedKnowledge;
import com.pawfectbite.server.knowledge.domain.IngredientKnowledge;
import com.pawfectbite.server.knowledge.domain.NutritionGuidance;
import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.recipes.domain.RecipePlan;
import com.pawfectbite.server.safety.domain.SafetyResult;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class RecipePlanBuilder {

    private final KnowledgeRetrievalService knowledgeService;

    public RecipePlanBuilder(KnowledgeRetrievalService knowledgeService) {
        this.knowledgeService = knowledgeService;
    }

    public RecipePlan build(
            Pet pet,
            String goal,
            List<String> ingredientsToInclude,
            List<String> ingredientsToExclude,
            SafetyResult safetyResult
    ) {
        RetrievedKnowledge knowledge = knowledgeService.retrieve(pet, ingredientsToInclude);

        List<String> knowledgeContext = new ArrayList<>();
        for (IngredientKnowledge ik : knowledge.ingredients()) {
            knowledgeContext.add("Ingredient: " + ik.name() + "\n" + ik.contentText());
        }
        for (NutritionGuidance ng : knowledge.guidance()) {
            knowledgeContext.add("Guidance: " + ng.title() + "\n" + ng.contentText());
        }

        return new RecipePlan(
                pet, goal, ingredientsToInclude, ingredientsToExclude,
                safetyResult, knowledgeContext
        );
    }
}
