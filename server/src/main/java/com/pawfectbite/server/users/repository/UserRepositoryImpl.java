package com.pawfectbite.server.users.repository;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.users.database.JpaUserRepository;
import com.pawfectbite.server.users.database.UserEntity;
import com.pawfectbite.server.users.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Infrastructure Adapter for the UserRepository.
 * 
 * This class implements the domain interface (`UserRepository`) and acts as a bridge 
 * between the pure business logic and the actual database technology (Spring Data JPA).
 * 
 * Its primary responsibility is to:
 * 1. Take domain requests and translate them into database operations using `JpaUserRepository`.
 * 2. Map between the database model (`UserEntity`) and the pure business model (`User`) 
 *    using methods like `toDomain()`.
 * 
 * This ensures the rest of the application doesn't have to know about JPA annotations, 
 * database tables, or SQL queries.
 */
@Repository
public class UserRepositoryImpl implements UserRepository {

    // The actual Spring Data JPA repository that talks to the database
    private final JpaUserRepository jpa;

    public UserRepositoryImpl(JpaUserRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Optional<User> findById(UUID id) {
        // Fetch the database entity and map it to a pure domain object
        return jpa.findById(id).map(UserEntity::toDomain);
    }

    @Override
    public Optional<User> findByGoogleId(String googleId) {
        return jpa.findByGoogleId(googleId).map(UserEntity::toDomain);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return jpa.findByEmail(email).map(UserEntity::toDomain);
    }

    @Override
    public User save(String email, String name, String pictureUrl, String googleId) {
        // Create a new database entity from the input data
        UserEntity entity = new UserEntity(email, name, pictureUrl, googleId);
        // Save it to the database and return the mapped domain object
        return jpa.save(entity).toDomain();
    }

    @Override
    public User update(UUID id, String name, String pictureUrl) {
        // Fetch the existing entity, update its fields, and save it back
        UserEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        entity.setName(name);
        entity.setPictureUrl(pictureUrl);
        return jpa.save(entity).toDomain();
    }
}
