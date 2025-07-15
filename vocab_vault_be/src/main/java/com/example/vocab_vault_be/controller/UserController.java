package com.example.vocab_vault_be.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.vocab_vault_be.dto.user.PasswordUpdateRequest;
import com.example.vocab_vault_be.dto.user.UserResponse;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private final UserService userService;

    @GetMapping("/list-all")
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> users = userRepository.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile() {
        return ResponseEntity.ok(userService.getProfile());
    }

    @PutMapping(value = "/change-profile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UserResponse> updateProfile(
            @RequestParam("fullName") String fullName,
            @RequestPart(value = "avatar", required = false) MultipartFile avatarFile) {
        UserResponse updatedUser = userService.updateProfile(fullName, avatarFile);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> updatePassword(@RequestBody @Valid PasswordUpdateRequest passwordUpdateRequest) {
        userService.updatePassword(passwordUpdateRequest);
        return ResponseEntity.ok("Cập nhật mật khẩu thành công");
    }
}
