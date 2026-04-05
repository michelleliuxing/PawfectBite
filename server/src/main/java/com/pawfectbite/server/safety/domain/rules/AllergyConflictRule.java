package com.pawfectbite.server.safety.domain.rules;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyRule;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AllergyConflictRule implements SafetyRule {

    @Override
    public List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients) {
        if (pet.allergies().isEmpty()) return List.of();

        Set<String> allergySet = pet.allergies().stream()
                .map(a -> a.trim().toLowerCase())
                .collect(Collectors.toSet());

        List<SafetyWarning> warnings = new ArrayList<>();
        for (String ingredient : requestedIngredients) {
            String normalized = ingredient.trim().toLowerCase();
            if (allergySet.contains(normalized)) {
                warnings.add(new SafetyWarning(
                        "ALLERGY_CONFLICT",
                        "'" + ingredient + "' conflicts with " + pet.name() + "'s known allergy",
                        RiskLevel.BLOCKED
                ));
            }
        }
        return warnings;
    }
}
