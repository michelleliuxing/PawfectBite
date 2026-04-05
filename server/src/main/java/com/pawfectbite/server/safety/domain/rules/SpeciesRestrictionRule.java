package com.pawfectbite.server.safety.domain.rules;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.pets.domain.Species;
import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyRule;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class SpeciesRestrictionRule implements SafetyRule {

    private static final Map<Species, Set<String>> SPECIES_RESTRICTIONS = Map.of(
            Species.CAT, Set.of("onion powder", "garlic powder", "raw fish", "dog food", "citrus"),
            Species.DOG, Set.of("cat food", "raw salmon", "raw trout")
    );

    @Override
    public List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients) {
        Set<String> restricted = SPECIES_RESTRICTIONS.getOrDefault(pet.species(), Set.of());
        List<SafetyWarning> warnings = new ArrayList<>();

        for (String ingredient : requestedIngredients) {
            String normalized = ingredient.trim().toLowerCase();
            if (restricted.contains(normalized)) {
                warnings.add(new SafetyWarning(
                        "SPECIES_RESTRICTION",
                        "'" + ingredient + "' is not suitable for " + pet.species().name().toLowerCase() + "s",
                        RiskLevel.RED
                ));
            }
        }
        return warnings;
    }
}
