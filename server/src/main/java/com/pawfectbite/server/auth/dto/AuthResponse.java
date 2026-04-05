package com.pawfectbite.server.auth.dto;

import com.pawfectbite.server.users.dto.UserResponse;

public record AuthResponse(
        String token,
        UserResponse user
) {}
