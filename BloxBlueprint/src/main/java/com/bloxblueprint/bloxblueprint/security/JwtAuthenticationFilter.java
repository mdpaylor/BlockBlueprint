package com.bloxblueprint.bloxblueprint.security;

import com.bloxblueprint.bloxblueprint.entities.User;
import com.bloxblueprint.bloxblueprint.repositories.UserRepository;
import com.bloxblueprint.bloxblueprint.services.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String AUTH_COOKIE_NAME = "access_token";

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        String jwt = getJwtFromCookies(request);

        try {
            if (
                    jwt != null
                            && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null
            ) {
                String username =
                        jwtService.extractUsername(jwt);

                Optional<User> optionalUser =
                        userRepository.findByUsername(username);

                if (optionalUser.isPresent()) {
                    User user = optionalUser.get();

                    if (jwtService.isTokenValid(jwt, user)) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        user.getUsername(),
                                        null,
                                        Collections.emptyList()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(authentication);
                    }
                }
            }
        } catch (JwtException | IllegalArgumentException exception) {
            SecurityContextHolder.clearContext();

            System.out.println(
                    "Unable to authenticate JWT: "
                            + exception.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null)
            return null;

        for (Cookie cookie : cookies) {
            if (AUTH_COOKIE_NAME.equals(cookie.getName()))
                return cookie.getValue();
        }

        return null;
    }
}
