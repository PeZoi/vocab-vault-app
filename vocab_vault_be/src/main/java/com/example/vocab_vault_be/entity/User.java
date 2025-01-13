package com.example.vocab_vault_be.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class User extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", length = 45, nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true, length = 30)
    private String email;

    @Column(length = 64, nullable = false)
    private String password;

    @Column(length = 100)
    private String avatar;

    private boolean enabled;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
