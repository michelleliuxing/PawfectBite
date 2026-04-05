package com.pawfectbite.server.users.repository;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.users.database.JpaUserRepository;
import com.pawfectbite.server.users.database.UserEntity;
import com.pawfectbite.server.users.domain.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final JpaUserRepository jpa;

    public UserRepositoryImpl(JpaUserRepository jpa) {
        this.jpa = jpa;
    }

    @Override
    public Optional<User> findById(UUID id) {
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
        UserEntity entity = new UserEntity(email, name, pictureUrl, googleId);
        return jpa.save(entity).toDomain();
    }

    @Override
    public User update(UUID id, String name, String pictureUrl) {
        UserEntity entity = jpa.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
        entity.setName(name);
        entity.setPictureUrl(pictureUrl);
        return jpa.save(entity).toDomain();
    }
}
