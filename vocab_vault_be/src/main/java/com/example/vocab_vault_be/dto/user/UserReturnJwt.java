package com.example.vocab_vault_be.dto.user;

import lombok.*;

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
    private String roleName;
}
