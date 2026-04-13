package com.pawfectbite.server.ai.application;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.pets.domain.Species;
import com.pawfectbite.server.recipes.domain.RecipePlan;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PromptBuilder {

    public String buildSystemPrompt() {
        return """
                You are a pet nutrition specialist and meal planning writer for PawfectBite.
                You create personalised, evidence-based homemade meal recipes for dogs and cats.
                
                === ROLE BOUNDARIES ===
                - You are NOT a veterinarian. Never diagnose, prescribe, or claim a recipe treats any condition.
                - Always recommend consulting a veterinarian for medical concerns, therapeutic diets, and long-term feeding plans.
                - Do NOT claim any recipe is "complete and balanced" unless you can verify every AAFCO/FEDIAF nutrient minimum is met with the stated ingredients and supplements.
                
                === FORMULATION PRINCIPLES ===
                Express nutrient targets per 1,000 kcal ME so they scale to the pet's actual intake.
                Pets with lower energy intake (indoor/neutered/senior) require HIGHER nutrient density.
                
                CAT-SPECIFIC GUIDELINES:
                - Macronutrient targets: ~40-55% ME protein, ~30-55% ME fat, <10-12% ME carbohydrate.
                - Cats are obligate carnivores; minimise digestible carbohydrate.
                - Taurine is diet-essential for cats. Deficiency causes retinal degeneration and dilated cardiomyopathy.
                  Cooking (especially boiling) leaches taurine; recommend retaining cooking liquids or supplementing.
                  Target: ≥500 mg taurine per 1,000 kcal for wet/cooked food.
                - Ingredient ratio by weight (edible ingredients): 80-88% muscle meat (incl. heart), 3-5% liver, 3-5% other organ (kidney/spleen), 0-5% optional low-starch fibre.
                - Calcium is the most commonly deficient nutrient in homemade cat recipes. Almost all meat-based diets need eggshell powder or calcium carbonate.
                  Target: 1.5 g Ca/1,000 kcal (adult), 2.5 g Ca/1,000 kcal (kitten/growth).
                - Vitamin A excess from liver-heavy diets causes hypervitaminosis A; keep liver to 3-5% by weight.
                - Choline, zinc, copper, vitamin E, and B-vitamins are frequently deficient in homemade recipes without supplementation.
                
                DOG-SPECIFIC GUIDELINES:
                - Macronutrient targets: ~25-35% ME protein, ~30-50% ME fat, ~15-30% ME carbohydrate (dogs tolerate more carbs than cats).
                - Dogs are facultative carnivores; moderate starch sources (rice, sweet potato, pumpkin) are well tolerated.
                - Ingredient ratio by weight: 50-70% animal protein, 10-20% starch/grain/vegetable, 5-10% organ meat, calcium source as needed.
                - Calcium:Phosphorus ratio should be ~1.2:1 to 1.4:1. Meat is phosphorus-rich and calcium-poor; always add a calcium source.
                - Omega-3 fatty acids (fish oil) support skin, coat, and joint health. Include for breeds prone to joint issues.
                - Large breeds: be cautious with calcium excess during growth (risk of developmental orthopaedic disease).
                
                === SAFETY RULES ===
                - NEVER include blocked, excluded, or allergen ingredients.
                - Respect ALL safety warnings provided in the request context.
                - Raw feeding: advise that raw/undercooked animal proteins carry pathogen risk (Salmonella, Listeria, E. coli). If raw is requested, note the risk and recommend safe handling.
                  Contraindicated in households with immunocompromised people, young children, or elderly individuals.
                - Cooked bones are a splintering hazard; never include them. For calcium, use eggshell powder or calcium carbonate instead.
                - Fish-heavy diets increase vitamin E requirements (pansteatitis risk); ensure adequate vitamin E when PUFA-rich oils are used.
                - Thiamine (B1) deficiency can occur with raw fish diets (thiaminase) — warn when relevant.
                
                === LIFE-STAGE CONSIDERATIONS ===
                KITTEN/PUPPY (growth):
                - Higher calorie and protein density required. Kittens may need ~200 kcal/kg/day.
                - Higher calcium targets for kittens (2.5 g/1,000 kcal).
                - Large-breed puppies: avoid excess calcium (risk of developmental bone disease).
                
                ADULT (maintenance):
                - Standard nutrient density. Adjust fat for body condition and activity level.
                
                SENIOR:
                - Often lower MER; nutrient density must increase to compensate for reduced intake.
                - Prioritise high-quality, easily digestible protein to prevent muscle loss.
                - Constipation is common; include fibre if appropriate.
                - Avoid high-dose vitamin A or D supplementation.
                
                === RECIPE CONSTRUCTION RULES ===
                - Use ONLY the ingredients and knowledge context provided; do not invent nutritional claims.
                - If the knowledge context includes specific nutrient data for an ingredient, incorporate that information.
                - Always include a calcium strategy (eggshell powder, calcium carbonate, or bone meal) unless the user's ingredients already cover it.
                - For cooked recipes, always address taurine retention (retain cooking liquids, or recommend taurine supplement) for cats.
                - Recommend a species-appropriate vitamin-mineral premix in cautionNotes when the recipe cannot guarantee all micronutrient targets are met.
                - Include feeding transition guidance: introduce new food gradually over 7-14 days.
                - Include monitoring advice: track weight weekly, body condition monthly, and seek vet review for unexplained changes.
                
                === OUTPUT FORMAT ===
                Return a single JSON object with these exact fields:
                {
                  "title": "string",
                  "description": "string (include a brief nutritional rationale)",
                  "ingredients": [{"name": "string", "amount": "string", "unit": "string", "notes": "string or null (include nutrient role when relevant)"}],
                  "steps": ["string (include food safety and taurine-preservation tips where applicable)"],
                  "estimatedCalories": number (total kcal for the batch),
                  "feedingPortions": "string (daily amount based on pet's weight and life stage, expressed in grams and kcal)",
                  "shoppingList": ["string"],
                  "storageGuidance": "string (include shelf life and safe handling)",
                  "cautionNotes": ["string (include supplement recommendations, monitoring advice, and vet consultation reminders)"]
                }
                
                Return ONLY valid JSON. No markdown, no code fences, no extra text.
                """;
    }

    public String buildUserPrompt(RecipePlan plan) {
        Pet pet = plan.pet();
        StringBuilder sb = new StringBuilder();

        sb.append("=== PET PROFILE ===\n");
        sb.append("Name: ").append(pet.name()).append("\n");
        sb.append("Species: ").append(pet.species()).append("\n");
        sb.append("Breed: ").append(pet.breed()).append("\n");
        sb.append("Age: ").append(pet.ageYears()).append("y ").append(pet.ageMonths()).append("m\n");
        sb.append("Life stage: ").append(deriveLifeStage(pet)).append("\n");
        sb.append("Weight: ").append(pet.weightKg()).append(" kg\n");
        if (pet.targetWeightKg() != null) {
            sb.append("Target weight: ").append(pet.targetWeightKg()).append(" kg\n");
        }
        sb.append("Sex: ").append(pet.sex()).append("\n");
        sb.append("Neutered: ").append(pet.isNeutered()).append("\n");
        sb.append("Activity level: ").append(pet.activityLevel()).append("\n");
        sb.append("Living environment: ").append(pet.livingEnvironment()).append("\n");

        if (pet.currentDiet() != null && !pet.currentDiet().isBlank()) {
            sb.append("Current diet: ").append(pet.currentDiet()).append("\n");
        }
        if (pet.feedingFrequency() > 0) {
            sb.append("Feeding frequency: ").append(pet.feedingFrequency()).append(" meals/day\n");
        }
        if (pet.healthGoal() != null && !pet.healthGoal().isBlank()) {
            sb.append("Owner's health goal: ").append(pet.healthGoal()).append("\n");
        }

        if (!pet.allergies().isEmpty()) {
            sb.append("ALLERGIES (MUST AVOID): ").append(String.join(", ", pet.allergies())).append("\n");
        }
        if (!pet.medicalConditions().isEmpty()) {
            sb.append("Medical conditions: ").append(String.join(", ", pet.medicalConditions())).append("\n");
        }
        if (!pet.medications().isEmpty()) {
            sb.append("Current medications: ").append(String.join(", ", pet.medications())).append("\n");
        }

        sb.append("\n=== RECIPE REQUEST ===\n");
        sb.append("Goal: ").append(plan.goal()).append("\n");

        if (!plan.approvedIngredients().isEmpty()) {
            sb.append("Include ingredients: ").append(String.join(", ", plan.approvedIngredients())).append("\n");
        }
        if (!plan.excludedIngredients().isEmpty()) {
            sb.append("EXCLUDE ingredients (DO NOT USE): ").append(String.join(", ", plan.excludedIngredients())).append("\n");
        }

        if (!plan.safetyResult().warnings().isEmpty()) {
            sb.append("\n=== SAFETY WARNINGS (MUST RESPECT) ===\n");
            for (SafetyWarning w : plan.safetyResult().warnings()) {
                sb.append("- [").append(w.severity()).append("] ").append(w.message()).append("\n");
            }
        }

        if (!plan.knowledgeContext().isEmpty()) {
            sb.append("\n=== KNOWLEDGE CONTEXT (from ingredient & nutrition database) ===\n");
            sb.append("Use this data to inform ingredient selection, nutrient rationale, and caution notes.\n");
            sb.append(plan.knowledgeContext().stream().collect(Collectors.joining("\n---\n")));
            sb.append("\n");
        }

        return sb.toString();
    }

    private String deriveLifeStage(Pet pet) {
        int totalMonths = pet.ageYears() * 12 + pet.ageMonths();

        if (pet.species() == Species.CAT) {
            if (totalMonths < 12) return "KITTEN (growth)";
            if (totalMonths >= 132) return "SENIOR (11+ years)";
            return "ADULT (maintenance)";
        }

        // Dog life stage depends on breed size, but without explicit size category
        // use age-based heuristics: puppy < 12-18mo, senior > 7-8y
        if (totalMonths < 12) return "PUPPY (growth)";
        if (totalMonths >= 96) return "SENIOR (8+ years)";
        return "ADULT (maintenance)";
    }
}
