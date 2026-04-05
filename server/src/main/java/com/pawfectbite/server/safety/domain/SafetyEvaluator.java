package com.pawfectbite.server.safety.domain;

import com.pawfectbite.server.pets.domain.Pet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SafetyEvaluator {

    private final List<SafetyRule> rules;

    public SafetyEvaluator(List<SafetyRule> rules) {
        this.rules = rules;
    }

    public SafetyResult evaluate(Pet pet, List<String> requestedIngredients) {
        List<SafetyWarning> allWarnings = new ArrayList<>();
        RiskLevel highestRisk = RiskLevel.GREEN;

        for (SafetyRule rule : rules) {
            List<SafetyWarning> warnings = rule.evaluate(pet, requestedIngredients);
            allWarnings.addAll(warnings);
            for (SafetyWarning w : warnings) {
                highestRisk = highestRisk.escalate(w.severity());
            }
        }

        return SafetyResult.of(highestRisk, allWarnings);
    }
}
