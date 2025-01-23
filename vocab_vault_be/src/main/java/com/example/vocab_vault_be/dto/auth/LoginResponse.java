package com.example.vocab_vault_be.dto.auth;

import com.example.vocab_vault_be.dto.user.UserReturnJwt;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;

    private UserReturnJwt user;
}
