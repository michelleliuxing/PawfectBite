package com.pawfectbite.server.ai.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pawfectbite.server.ai.domain.StructuredRecipeOutput;
import com.pawfectbite.server.common.exception.AppException;
import com.pawfectbite.server.infrastructure.openai.OpenAIClient;
import com.pawfectbite.server.recipes.domain.RecipePlan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class LLMRecipeWriter {

    private static final Logger log = LoggerFactory.getLogger(LLMRecipeWriter.class);

    private final OpenAIClient openAIClient;
    private final PromptBuilder promptBuilder;
    private final ObjectMapper objectMapper;

    public LLMRecipeWriter(OpenAIClient openAIClient, PromptBuilder promptBuilder, ObjectMapper objectMapper) {
        this.openAIClient = openAIClient;
        this.promptBuilder = promptBuilder;
        this.objectMapper = objectMapper;
    }

    public StructuredRecipeOutput generateRecipe(RecipePlan plan) {
        String systemPrompt = promptBuilder.buildSystemPrompt();
        String userPrompt = promptBuilder.buildUserPrompt(plan);

        log.info("Sending recipe generation request to LLM for pet={}", plan.pet().name());

        String rawResponse = openAIClient.chatCompletion(systemPrompt, userPrompt);

        try {
            StructuredRecipeOutput output = objectMapper.readValue(rawResponse, StructuredRecipeOutput.class);
            log.info("Successfully parsed LLM recipe output: title={}", output.title());
            return output;
        } catch (Exception e) {
            log.error("Failed to parse LLM response: {}", rawResponse, e);
            throw new AppException("LLM_PARSE_ERROR", "Failed to parse recipe from AI response");
        }
    }
}
