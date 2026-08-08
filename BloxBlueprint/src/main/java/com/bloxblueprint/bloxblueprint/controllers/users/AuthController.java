package com.bloxblueprint.bloxblueprint.controllers.users;

import com.bloxblueprint.bloxblueprint.dtos.user.*;
import com.bloxblueprint.bloxblueprint.entities.User;
import com.bloxblueprint.bloxblueprint.mappers.UserMapper;
import com.bloxblueprint.bloxblueprint.repositories.UserRepository;
import com.bloxblueprint.bloxblueprint.services.AuthCookieService;
import com.bloxblueprint.bloxblueprint.services.AuthService;
import com.bloxblueprint.bloxblueprint.services.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.UriComponentsBuilder;

@AllArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    private final AuthCookieService authCookieService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> register(
            @RequestBody RegisterUserRequestDto registerUserRequestDto,
            UriComponentsBuilder uriBuilder
    ) {
        RegisterUserResponseDto responseDto = authService.registerUser(registerUserRequestDto);
        if (!responseDto.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responseDto);
        }

        String jwt = jwtService.generateToken(responseDto.getUser().getUsername());
        ResponseCookie authCookie = authCookieService.createAuthCookie(jwt);

        var userLocation = uriBuilder.path("/users/{id}").buildAndExpand(responseDto.getUser().getId()).toUri();

        return ResponseEntity.created(userLocation).header(HttpHeaders.SET_COOKIE, authCookie.toString()).body(responseDto);
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

        String jwt = jwtService.generateToken(responseDto.getUser().getUsername());

        ResponseCookie authCookie = authCookieService.createAuthCookie(jwt);

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, authCookie.toString()).body(responseDto);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken
        ) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        System.out.println(authentication.getName());
        User user = userRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        UserDto userDto = userMapper.toUserDto(user);

        return ResponseEntity.ok(userDto);
    }
}
