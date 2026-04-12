package com.pawfectbite.server.recipes.repository;

import com.pawfectbite.server.recipes.domain.RecipeRequest;

import java.util.UUID;

public interface RecipeRequestRepository {
    RecipeRequest save(RecipeRequest request);
}
