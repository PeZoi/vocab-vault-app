package com.example.vocab_vault_be.entity;

import com.example.vocab_vault_be.utils.enums.Status;
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

    private String password;

    @Column(length = 100)
    private String avatar;

    private boolean enabled;

    private String type;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "refresh_token", columnDefinition = "MEDIUMTEXT")
    private String refreshToken;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;
}
