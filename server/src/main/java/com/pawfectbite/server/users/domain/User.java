package com.pawfectbite.server.users.domain;

import java.time.Instant;
import java.util.UUID;

public record User(
        UUID id,
        String email,
        String name,
        String pictureUrl,
        String googleId,
        Instant createdAt,
        Instant updatedAt
) {}
