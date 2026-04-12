package com.pawfectbite.server.knowledge.controller;

import com.pawfectbite.server.knowledge.application.EmbeddingService;
import com.pawfectbite.server.knowledge.application.EmbeddingService.EmbeddingResult;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/knowledge")
public class KnowledgeAdminController {

    private final EmbeddingService embeddingService;

    public KnowledgeAdminController(EmbeddingService embeddingService) {
        this.embeddingService = embeddingService;
    }

    @PostMapping("/embed")
    public ResponseEntity<Map<String, Object>> embedAll() {
        EmbeddingResult result = embeddingService.embedAll();
        return ResponseEntity.ok(Map.of(
                "ingredientsProcessed", result.ingredientsProcessed(),
                "guidanceProcessed", result.guidanceProcessed(),
                "errors", result.errors()
        ));
    }
}
