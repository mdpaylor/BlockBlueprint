package com.bloxblueprint.bloxblueprint.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AuthCookieService {
    private static final String COOKIE_NAME = "access_token";

    private final boolean secureCookie;
    private final long jwtExpiration;

    public AuthCookieService(
            @Value("${app.cookie.secure:true}") boolean secureCookie,
            @Value("${jwt.expiration}") long jwtExpiration
    ) {
        this.secureCookie = secureCookie;
        this.jwtExpiration = jwtExpiration;
    }

    public ResponseCookie createAuthCookie(String jwt) {
        return ResponseCookie.from(COOKIE_NAME, jwt)
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(jwtExpiration))
                .build();
    }

    public ResponseCookie deleteAuthCookie() {
        return ResponseCookie.from(COOKIE_NAME, "")
                .httpOnly(true)
                .secure(secureCookie)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMillis(jwtExpiration))
                .build();
    }

    public String getCookie() {
        return COOKIE_NAME;
    }
}
