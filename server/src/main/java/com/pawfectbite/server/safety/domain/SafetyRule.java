package com.pawfectbite.server.safety.domain;

import com.pawfectbite.server.pets.domain.Pet;

import java.util.List;

public interface SafetyRule {
    List<SafetyWarning> evaluate(Pet pet, List<String> requestedIngredients);
}
