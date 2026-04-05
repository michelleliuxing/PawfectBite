package com.pawfectbite.server.auth.application;

import com.pawfectbite.server.auth.dto.AuthResponse;
import com.pawfectbite.server.common.exception.AppException;
import com.pawfectbite.server.infrastructure.security.GoogleTokenVerifier;
import com.pawfectbite.server.infrastructure.security.GoogleTokenVerifier.GoogleUserInfo;
import com.pawfectbite.server.infrastructure.security.JwtService;
import com.pawfectbite.server.users.application.UserService;
import com.pawfectbite.server.users.domain.User;
import com.pawfectbite.server.users.dto.UserResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final GoogleTokenVerifier googleTokenVerifier;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthService(GoogleTokenVerifier googleTokenVerifier, UserService userService, JwtService jwtService) {
        this.googleTokenVerifier = googleTokenVerifier;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @Transactional
    public AuthResponse authenticateWithGoogle(String idToken) {
        GoogleUserInfo googleUser = googleTokenVerifier.verify(idToken)
                .orElseThrow(() -> new AppException("AUTH_FAILED", "Invalid Google ID token"));

        User user = userService.getOrCreateByGoogle(
                googleUser.email(),
                googleUser.name(),
                googleUser.pictureUrl(),
                googleUser.googleId()
        );

        String jwt = jwtService.generateToken(user.id(), user.email(), user.name());

        log.info("User authenticated: email={}", user.email());
        return new AuthResponse(jwt, UserResponse.from(user));
    }
}
