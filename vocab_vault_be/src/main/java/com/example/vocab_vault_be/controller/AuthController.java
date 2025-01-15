package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.request.LoginRequest;
import com.example.vocab_vault_be.dto.request.UserRequest;
import com.example.vocab_vault_be.dto.response.LoginResponse;
import com.example.vocab_vault_be.dto.response.UserResponse;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @Value("${vocab.vault.refresh-token-expiration}")
    private long jwtRefreshTokenExpiration;

    public AuthController(AuthService authService, UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registration(@RequestBody @Valid UserRequest userRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(userRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.login(loginRequest);
        String refresh_token = userRepository.findByEmail(loginResponse.getUser().getEmail()).get().getRefreshToken();

        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refresh_token).httpOnly(true).secure(true).path("/").maxAge(jwtRefreshTokenExpiration).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(loginResponse);
    }
}
