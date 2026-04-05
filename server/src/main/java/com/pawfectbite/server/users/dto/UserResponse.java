package com.pawfectbite.server.users.dto;

import com.pawfectbite.server.users.domain.User;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String email,
        String name,
        String pictureUrl,
        Instant createdAt
) {
    public static UserResponse from(User user) {
        return new UserResponse(user.id(), user.email(), user.name(), user.pictureUrl(), user.createdAt());
    }
}
