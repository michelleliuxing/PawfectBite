package com.pawfectbite.server.users.application;

import com.pawfectbite.server.common.exception.ResourceNotFoundException;
import com.pawfectbite.server.users.domain.User;
import com.pawfectbite.server.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    public User getOrCreateByGoogle(String email, String name, String pictureUrl, String googleId) {
        return userRepository.findByGoogleId(googleId)
                .orElseGet(() -> userRepository.save(email, name, pictureUrl, googleId));
    }
}
