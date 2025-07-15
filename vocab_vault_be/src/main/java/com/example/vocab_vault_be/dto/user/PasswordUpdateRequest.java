package com.example.vocab_vault_be.dto.user;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordUpdateRequest {

  @NotBlank(message = "Mật khẩu hiện tại không được để trống")
  private String currentPassword;

  @Length(min = 8, message = "Mật khẩu mới ít nhất 8 ký tự")
  @NotBlank(message = "Mật khẩu mới không được để trống")
  private String newPassword;
}