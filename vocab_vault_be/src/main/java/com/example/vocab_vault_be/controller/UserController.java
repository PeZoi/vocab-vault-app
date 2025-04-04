package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.user.UserResponse;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
