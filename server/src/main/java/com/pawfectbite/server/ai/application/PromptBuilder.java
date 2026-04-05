package com.pawfectbite.server.ai.application;

import com.pawfectbite.server.recipes.domain.RecipePlan;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PromptBuilder {

    public String buildSystemPrompt() {
        return """
                You are a pet meal planning writer for PawfectBite.
                You create personalized homemade meal recipes for dogs and cats.
                
                CRITICAL RULES:
                - You are NOT a veterinarian. Never diagnose or prescribe.
                - Only use the ingredients and context provided.
                - Never include blocked or excluded ingredients.
                - Respect all safety warnings.
                - Always recommend consulting a veterinarian for medical concerns.
                - Do not claim recipes are "complete and balanced" unless explicitly verified.
                
                OUTPUT FORMAT:
                Return a single JSON object with these exact fields:
                {
                  "title": "string",
                  "description": "string",
                  "ingredients": [{"name": "string", "amount": "string", "unit": "string", "notes": "string or null"}],
                  "steps": ["string"],
                  "estimatedCalories": number,
                  "feedingPortions": "string",
                  "shoppingList": ["string"],
                  "prepTimeMinutes": number,
                  "storageGuidance": "string",
                  "cautionNotes": ["string"]
                }
                
                Return ONLY valid JSON. No markdown, no code fences, no extra text.
                """;
    }

    public String buildUserPrompt(RecipePlan plan) {
        StringBuilder sb = new StringBuilder();

        sb.append("=== PET PROFILE ===\n");
        sb.append("Name: ").append(plan.pet().name()).append("\n");
        sb.append("Species: ").append(plan.pet().species()).append("\n");
        sb.append("Breed: ").append(plan.pet().breed()).append("\n");
        sb.append("Age: ").append(plan.pet().ageYears()).append("y ").append(plan.pet().ageMonths()).append("m\n");
        sb.append("Weight: ").append(plan.pet().weightKg()).append(" kg\n");
        if (plan.pet().targetWeightKg() != null) {
            sb.append("Target weight: ").append(plan.pet().targetWeightKg()).append(" kg\n");
        }
        sb.append("Activity: ").append(plan.pet().activityLevel()).append("\n");
        sb.append("Neutered: ").append(plan.pet().isNeutered()).append("\n");

        if (!plan.pet().allergies().isEmpty()) {
            sb.append("ALLERGIES (MUST AVOID): ").append(String.join(", ", plan.pet().allergies())).append("\n");
        }
        if (!plan.pet().medicalConditions().isEmpty()) {
            sb.append("Medical conditions: ").append(String.join(", ", plan.pet().medicalConditions())).append("\n");
        }
        if (!plan.pet().medications().isEmpty()) {
            sb.append("Medications: ").append(String.join(", ", plan.pet().medications())).append("\n");
        }

        sb.append("\n=== RECIPE REQUEST ===\n");
        sb.append("Goal: ").append(plan.goal()).append("\n");
        sb.append("Budget: ").append(plan.budget()).append("\n");
        sb.append("Max prep time: ").append(plan.prepTimeMinutes()).append(" minutes\n");

        if (!plan.approvedIngredients().isEmpty()) {
            sb.append("Include ingredients: ").append(String.join(", ", plan.approvedIngredients())).append("\n");
        }
        if (!plan.excludedIngredients().isEmpty()) {
            sb.append("EXCLUDE ingredients: ").append(String.join(", ", plan.excludedIngredients())).append("\n");
        }

        if (!plan.safetyResult().warnings().isEmpty()) {
            sb.append("\n=== SAFETY WARNINGS ===\n");
            for (SafetyWarning w : plan.safetyResult().warnings()) {
                sb.append("- [").append(w.severity()).append("] ").append(w.message()).append("\n");
            }
        }

        if (!plan.knowledgeContext().isEmpty()) {
            sb.append("\n=== KNOWLEDGE CONTEXT ===\n");
            sb.append(plan.knowledgeContext().stream().collect(Collectors.joining("\n---\n")));
            sb.append("\n");
        }

        return sb.toString();
    }
}
