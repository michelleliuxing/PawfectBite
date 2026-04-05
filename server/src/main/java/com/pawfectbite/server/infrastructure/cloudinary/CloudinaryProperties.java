package com.pawfectbite.server.infrastructure.cloudinary;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.cloudinary")
public record CloudinaryProperties(
        String cloudName,
        String apiKey,
        String apiSecret
) {}
