package com.pawfectbite.server.safety.domain.rules;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.safety.domain.RiskLevel;
import com.pawfectbite.server.safety.domain.SafetyRule;
import com.pawfectbite.server.safety.domain.SafetyWarning;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LifeStageRule implements SafetyRule {

    @Override
    public List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients) {
        List<SafetyWarning> warnings = new ArrayList<>();

        boolean isPuppy = pet.ageYears() == 0 && pet.ageMonths() < 6;
        boolean isSenior = (pet.species().name().equals("DOG") && pet.ageYears() >= 10)
                || (pet.species().name().equals("CAT") && pet.ageYears() >= 12);

        if (isPuppy) {
            warnings.add(new SafetyWarning(
                    "LIFE_STAGE",
                    pet.name() + " is very young. Homemade diets for puppies/kittens under 6 months require veterinary guidance",
                    RiskLevel.RED
            ));
        }

        if (isSenior) {
            warnings.add(new SafetyWarning(
                    "LIFE_STAGE",
                    pet.name() + " is a senior pet. Dietary adjustments may be needed — consult a veterinarian",
                    RiskLevel.AMBER
            ));
        }

        return warnings;
    }
}
