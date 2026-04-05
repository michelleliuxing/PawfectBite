package com.pawfectbite.server.users.controller;

import com.pawfectbite.server.common.response.ApiResponse;
import com.pawfectbite.server.infrastructure.security.AuthenticatedUser;
import com.pawfectbite.server.users.application.UserService;
import com.pawfectbite.server.users.domain.User;
import com.pawfectbite.server.users.dto.UserResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> getCurrentUser(@AuthenticationPrincipal AuthenticatedUser principal) {
        User user = userService.getUserById(principal.userId());
        return ApiResponse.ok(UserResponse.from(user));
    }
}
