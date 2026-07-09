package com.bloxblueprint.bloxblueprint.controllers.users;

import com.bloxblueprint.bloxblueprint.dtos.user.*;
import com.bloxblueprint.bloxblueprint.mappers.UserMapper;
import com.bloxblueprint.bloxblueprint.repositories.UserRepository;
import com.bloxblueprint.bloxblueprint.services.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(
            @RequestBody RegisterUserRequestDto registerUserRequestDto,
            UriComponentsBuilder uriBuilder
    ) {
        RegisterUserResponseDto responseDto = authService.registerUser(registerUserRequestDto);
        if (!responseDto.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDto);
        }

        var uri = uriBuilder.path("/users/{id}").buildAndExpand(responseDto.getUser().getId()).toUri();

        return ResponseEntity.created(uri).body(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> login(
            @RequestBody LoginUserRequestDto loginRequestDto,
            UriComponentsBuilder uriBuilder
    ) {
        LoginUserResponseDto responseDto = authService.login(loginRequestDto);

        if (!responseDto.isSuccess()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseDto);
        }

        return ResponseEntity.ok(responseDto);
    }
}
