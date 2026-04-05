package com.pawfectbite.server.safety.application;

import com.pawfectbite.server.pets.domain.Pet;
import com.pawfectbite.server.safety.domain.SafetyEvaluator;
import com.pawfectbite.server.safety.domain.SafetyResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SafetyService {

    private static final Logger log = LoggerFactory.getLogger(SafetyService.class);

    private final SafetyEvaluator evaluator;

    public SafetyService(SafetyEvaluator evaluator) {
        this.evaluator = evaluator;
    }

    public SafetyResult evaluate(Pet pet, List<String> requestedIngredients) {
        SafetyResult result = evaluator.evaluate(pet, requestedIngredients);

        log.info("Safety evaluation for pet={}: riskLevel={}, warnings={}, canProceed={}",
                pet.name(), result.riskLevel(), result.warnings().size(), result.canProceed());

        if (!result.canProceed()) {
            log.warn("Recipe generation BLOCKED for pet={}: {}", pet.name(),
                    result.warnings().stream().map(w -> w.message()).toList());
        }

        return result;
    }
}
