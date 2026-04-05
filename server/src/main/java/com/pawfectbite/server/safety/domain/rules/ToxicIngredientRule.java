package com.pawfectbite.server.safety.domain.rules;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyRule;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class ToxicIngredientRule implements SafetyRule {

    private static final Set<String> TOXIC_INGREDIENTS = Set.of(
            "chocolate", "xylitol", "grapes", "raisins", "onion", "onions",
            "garlic", "alcohol", "caffeine", "coffee", "cooked bones",
            "macadamia nuts", "macadamia", "avocado pit", "nutmeg",
            "raw yeast dough", "apple seeds", "cherry pits"
    );

    @Override
    public List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients) {
        List<SafetyWarning> warnings = new ArrayList<>();
        for (String ingredient : requestedIngredients) {
            String normalized = ingredient.trim().toLowerCase();
            if (TOXIC_INGREDIENTS.contains(normalized)) {
                warnings.add(new SafetyWarning(
                        "TOXIC_INGREDIENT",
                        "'" + ingredient + "' is toxic to " + pet.species().name().toLowerCase() + "s and must not be included",
                        RiskLevel.BLOCKED
                ));
            }
        }
        return warnings;
    }
}
