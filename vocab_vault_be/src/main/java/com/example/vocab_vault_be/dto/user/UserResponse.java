package com.example.vocab_vault_be.dto.user;

import com.example.vocab_vault_be.entity.Role;
import com.example.vocab_vault_be.utils.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private String avatar;
    private String type;
    private Instant createAt;
    private Instant updateAt;
    private boolean enabled;
    private Status status;
    private Role role;
}
