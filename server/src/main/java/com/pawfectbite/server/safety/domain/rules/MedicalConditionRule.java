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
public class MedicalConditionRule implements SafetyRule {

    private static final Set<String> HIGH_RISK_CONDITIONS = Set.of(
            "kidney disease", "renal failure", "chronic kidney disease",
            "liver disease", "hepatic disease", "diabetes",
            "pancreatitis", "cancer", "heart disease",
            "epilepsy", "cushing's disease"
    );

    private static final Set<String> MODERATE_RISK_CONDITIONS = Set.of(
            "obesity", "arthritis", "ibd", "inflammatory bowel disease",
            "urinary crystals", "hypothyroidism", "hyperthyroidism",
            "food intolerance", "skin allergies"
    );

    @Override
    public List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients) {
        List<SafetyWarning> warnings = new ArrayList<>();

        for (String condition : pet.medicalConditions()) {
            String normalized = condition.trim().toLowerCase();
            if (HIGH_RISK_CONDITIONS.contains(normalized)) {
                warnings.add(new SafetyWarning(
                        "MEDICAL_CONDITION",
                        pet.name() + " has '" + condition + "'. This requires veterinary-supervised dietary planning",
                        RiskLevel.RED
                ));
            } else if (MODERATE_RISK_CONDITIONS.contains(normalized)) {
                warnings.add(new SafetyWarning(
                        "MEDICAL_CONDITION",
                        pet.name() + " has '" + condition + "'. Recipe will be adjusted with extra caution",
                        RiskLevel.AMBER
                ));
            }
        }

        return warnings;
    }
}
