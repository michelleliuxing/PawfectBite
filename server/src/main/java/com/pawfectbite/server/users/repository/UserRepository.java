package com.pawfectbite.server.users.repository;

import com.pawfectbite.server.users.domain.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> findById(UUID id);
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByEmail(String email);
    User save(String email, String name, String pictureUrl, String googleId);
    User update(UUID id, String name, String pictureUrl);
}
