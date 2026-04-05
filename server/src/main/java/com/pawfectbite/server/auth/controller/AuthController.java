package com.pawfectbite.server.auth.controller;

import com.pawfectbite.server.auth.application.AuthService;
import com.pawfectbite.server.auth.dto.AuthResponse;
import com.pawfectbite.server.auth.dto.GoogleAuthRequest;
import com.pawfectbite.server.common.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/google")
    public ApiResponse<AuthResponse> authenticateWithGoogle(@Valid @RequestBody GoogleAuthRequest request) {
        AuthResponse response = authService.authenticateWithGoogle(request.idToken());
        return ApiResponse.ok(response);
    }
}
