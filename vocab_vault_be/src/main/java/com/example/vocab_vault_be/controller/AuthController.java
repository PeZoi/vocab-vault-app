package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.auth.LoginRequest;
import com.example.vocab_vault_be.dto.auth.LoginResponse;
import com.example.vocab_vault_be.dto.user.UserRequest;
import com.example.vocab_vault_be.dto.user.UserResponse;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    @GetMapping("/social-login")
    public ResponseEntity<String> socialLogin(@RequestParam("type") String loginType) {
        return ResponseEntity.ok(authService.socialLogin(loginType));
    }

    @GetMapping("/social/callback")
    public ResponseEntity<LoginResponse> callbackSocial(@RequestParam("type") String loginType,
                                                        @RequestParam("code") String code) throws IOException {
        LoginResponse loginResponse = authService.callbackSocial(loginType, code);
        String refresh_token = userRepository.findByEmail(loginResponse.getUser().getEmail()).get().getRefreshToken();

        ResponseCookie responseCookie = ResponseCookie.from("refresh_token", refresh_token).httpOnly(true).secure(true).path("/").maxAge(jwtRefreshTokenExpiration).build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(loginResponse);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout() {
        authService.logout();

        ResponseCookie responseCookie = ResponseCookie
                .from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, responseCookie.toString()).body(null);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verify(@RequestParam(value = "verifyCode") String verifyCode, @RequestParam(value =
            "email") String email) {

        return ResponseEntity.ok().body(authService.verify(verifyCode, email));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> requestForgotPassword(@RequestParam(value = "email") String email) {
        authService.requestForgotPassword(email);
        return ResponseEntity.ok("Chúng tôi đã gửi một liên kết đặt lại mật khẩu đến địa chỉ email của bạn. Vui lòng kiểm tra!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> showResetForm(@RequestParam(value = "token") String token) {
        UserResponse response = authService.findByResetPasswordToken(token);
        if (response != null) {
            return ResponseEntity.ok("Mã hợp lệ");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mã không hợp lệ");
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> updatePasswordInForgotForm(@RequestParam(value = "token") String token, @RequestParam(value = "password") String newPassword) {
        authService.changePassword(token, newPassword);
        return ResponseEntity.ok("Đổi mật khẩu thành công.");
    }
}
