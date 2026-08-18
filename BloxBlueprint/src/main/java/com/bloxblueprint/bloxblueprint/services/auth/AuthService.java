package com.bloxblueprint.bloxblueprint.services.auth;

import com.bloxblueprint.bloxblueprint.dtos.user.*;
import com.bloxblueprint.bloxblueprint.entities.User;
import com.bloxblueprint.bloxblueprint.mappers.UserMapper;
import com.bloxblueprint.bloxblueprint.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public RegisterUserResponseDto registerUser(RegisterUserRequestDto registerUserRequestDto) {
        boolean usernameTaken = userRepository.existsByUsername(registerUserRequestDto.getUsername());
        boolean emailTaken = userRepository.existsByEmail(registerUserRequestDto.getEmail());
        boolean phoneNumberTaken = userRepository.existsByPhoneNumber(registerUserRequestDto.getPhoneNumber());

        if (usernameTaken || emailTaken || phoneNumberTaken) {
            return RegisterUserResponseDto.builder()
                    .success(false)
                    .usernameTaken(usernameTaken)
                    .emailTaken(emailTaken)
                    .phoneNumberTaken(phoneNumberTaken)
                    .build();
        }

        User user = userMapper.toEntity(registerUserRequestDto);
        user.setPassword(passwordEncoder.encode(registerUserRequestDto.getPassword()));

        User savedUser = userRepository.save(user);

        return RegisterUserResponseDto.builder()
                .success(true)
                .user(userMapper.toUserDto(savedUser))
                .build();
    }

    public LoginUserResponseDto login(LoginUserRequestDto loginRequestDto) {
        Optional<User> optionalUser = findUser(loginRequestDto);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
                return LoginUserResponseDto.builder()
                        .success(true)
                        .message("Login successful")
                        .user(userMapper.toUserDto(user))
                        .build();
            }
        }

        return LoginUserResponseDto.builder()
                .success(false)
                .message("Invalid username or password")
                .build();
    }

    public UserDto getCurrentUser(String username) {
        User user = userRepository
                .findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return userMapper.toUserDto(user);
    }

    private Optional<User> findUser(LoginUserRequestDto loginRequestDto) {
        String identifier = loginRequestDto.getIdentifier();
        if (identifier == null || identifier.isBlank())
            return Optional.empty();

        return userRepository.findByUsernameOrEmailOrPhoneNumber(identifier, identifier, identifier);
    }
}
