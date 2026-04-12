package com.pawfectbite.server.infrastructure.openai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

@Component
@EnableConfigurationProperties(OpenAIProperties.class)
public class OpenAIClient {

    private static final Logger log = LoggerFactory.getLogger(OpenAIClient.class);
    private static final String CHAT_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String EMBEDDING_API_URL = "https://api.openai.com/v1/embeddings";
    private static final String EMBEDDING_MODEL = "text-embedding-3-small";

    private final OpenAIProperties properties;
    private final ObjectMapper objectMapper;
    private final HttpClient httpClient;

    public OpenAIClient(OpenAIProperties properties, ObjectMapper objectMapper) {
        this.properties = properties;
        this.objectMapper = objectMapper;
        this.httpClient = HttpClient.newHttpClient();
    }

    public String chatCompletion(String systemPrompt, String userPrompt) {
        try {
            Map<String, Object> body = Map.of(
                    "model", properties.model(),
                    "max_tokens", properties.maxTokens(),
                    "response_format", Map.of("type", "json_object"),
                    "messages", List.of(
                            Map.of("role", "system", "content", systemPrompt),
                            Map.of("role", "user", "content", userPrompt)
                    )
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(CHAT_API_URL))
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + properties.apiKey())
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("OpenAI API error: status={}, body={}", response.statusCode(), response.body());
                throw new RuntimeException("OpenAI API returned status " + response.statusCode());
            }

            JsonNode root = objectMapper.readTree(response.body());
            return root.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            log.error("Failed to call OpenAI API", e);
            throw new RuntimeException("LLM call failed", e);
        }
    }

    public float[] generateEmbedding(String text) {
        try {
            Map<String, Object> body = Map.of(
                    "model", EMBEDDING_MODEL,
                    "input", text
            );

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(EMBEDDING_API_URL))
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + properties.apiKey())
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                log.error("Embedding API error: status={}, body={}", response.statusCode(), response.body());
                throw new RuntimeException("Embedding API returned status " + response.statusCode());
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode embeddingArray = root.path("data").get(0).path("embedding");

            float[] embedding = new float[embeddingArray.size()];
            for (int i = 0; i < embeddingArray.size(); i++) {
                embedding[i] = (float) embeddingArray.get(i).asDouble();
            }
            return embedding;
        } catch (Exception e) {
            log.error("Failed to generate embedding", e);
            throw new RuntimeException("Embedding generation failed", e);
        }
    }
}
