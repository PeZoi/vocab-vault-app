package com.example.vocab_vault_be.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserShortenResponse {
    private Long id;
    private String fullName;
    private String email;
    private String avatar;
}
