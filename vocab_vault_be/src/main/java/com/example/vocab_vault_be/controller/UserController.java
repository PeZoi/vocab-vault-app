package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/list-all")
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> users = userRepository.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User userResponse = userRepository.save(user);
        return ResponseEntity.status(201).body(userResponse);
    }
}
