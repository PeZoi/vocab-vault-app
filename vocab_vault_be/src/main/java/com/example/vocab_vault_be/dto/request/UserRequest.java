package com.example.vocab_vault_be.dto.request;


import jakarta.validation.constraints.Email;
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
public class UserRequest {

    private Long id;

    @NotBlank(message = "Họ và tên không được để trống")
    @Length(min = 4, max = 64, message = "Họ và tên phải có 4 - 64 ký tự")
    private String fullName;

    @Email(message = "Email không hợp lệ")
    @NotBlank(message = "Email không được để trống")
    @Length(min = 15, max = 64, message = "Email phải có 15 - 64 ký tự")
    private String email;

    @Length(min = 8, message = "Mật khẩu ít nhất 8 ký tự")
    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;
}