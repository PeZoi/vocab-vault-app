package com.example.vocab_vault_be.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserReturnJwt {
    private Long id;
    private String fullName;
    private String email;
    private String avatar;
    private String type;
    private String roleName;
}
