package com.pawfectbite.server.infrastructure.openai;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.openai")
public record OpenAIProperties(
        String apiKey,
        String model,
        int maxTokens
) {}
