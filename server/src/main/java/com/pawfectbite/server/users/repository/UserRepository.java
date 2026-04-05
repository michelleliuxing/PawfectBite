package com.pawfectbite.server.users.repository;

import com.pawfectbite.server.users.domain.User;

import java.util.Optional;
import java.util.UUID;

/**
 * Domain Repository Interface for User operations.
 * 
 * This interface defines the contract for how the application's business logic 
 * (like UserService) interacts with user data. 
 * 
 * By keeping this as a pure Java interface that only knows about the domain model (`User`), 
 * we decouple our core business logic from any specific database technology (like JPA or SQL).
 * The business layer only cares THAT a user is saved, not HOW it is saved.
 */
public interface UserRepository {
    Optional<User> findById(UUID id);
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByEmail(String email);
    User save(String email, String name, String pictureUrl, String googleId);
    User update(UUID id, String name, String pictureUrl);
}
