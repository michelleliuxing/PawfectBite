package com.pawfectbite.server.infrastructure.security;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class OwnershipEnforcer {

    public AuthenticatedUser currentUser() {
        return (AuthenticatedUser) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    public UUID currentUserId() {
        return currentUser().userId();
    }

    public void enforce(UUID resourceOwnerId) {
        if (!currentUserId().equals(resourceOwnerId)) {
            throw new AccessDeniedException("You do not own this resource");
        }
    }
}
