package com.example.vocab_vault_be.service;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.vocab_vault_be.dto.user.PasswordUpdateRequest;
import com.example.vocab_vault_be.dto.user.UserResponse;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.exception.CustomException;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.security.SecurityUtil;
import com.example.vocab_vault_be.utils.UploadFile;
import com.example.vocab_vault_be.utils.enums.Status;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final UploadFile uploadFile;

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email không tồn tại"));
    }

    public void updateRefreshTokenUser(String refreshToken, String email) {
        User userInDB = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email không tồn " + "tại"));
        if (userInDB.getStatus() != null && userInDB.getStatus().equals(Status.DELETED)) {
            throw new UsernameNotFoundException("User đã bị xoá");
        }
        userInDB.setRefreshToken(refreshToken);
        userRepository.save(userInDB);
    }

    public UserResponse getProfile() {
        String email = SecurityUtil.getCurrentUserLogin().orElseThrow(() -> new NotFoundException("Không tìm thấy " +
                "user"));
        User user = userRepository.findByEmail(email).orElseThrow();
        return modelMapper.map(user, UserResponse.class);
    }

    @Transactional
    public UserResponse updateProfile(String fullName, MultipartFile avatarFile) {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new NotFoundException("Không tìm thấy user"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User không tồn tại"));

        // Check if user is deleted
        if (user.getStatus() != null && user.getStatus().equals(Status.DELETED)) {
            throw new CustomException("User đã bị xoá", HttpStatus.BAD_REQUEST);
        }

        // Validate fullName
        if (fullName == null || fullName.trim().isEmpty()) {
            throw new CustomException("Họ và tên không được để trống", HttpStatus.BAD_REQUEST);
        }

        if (fullName.length() < 4 || fullName.length() > 64) {
            throw new CustomException("Họ và tên phải có 4 - 64 ký tự", HttpStatus.BAD_REQUEST);
        }

        // Update profile fields
        user.setFullName(fullName);

        // Upload avatar if provided
        if (avatarFile != null && !avatarFile.isEmpty()) {
            // Validate file type
            String contentType = avatarFile.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new CustomException("Chỉ chấp nhận file hình ảnh", HttpStatus.BAD_REQUEST);
            }

            // Validate file size (5MB max)
            if (avatarFile.getSize() > 5 * 1024 * 1024) {
                throw new CustomException("Kích thước file không được vượt quá 5MB", HttpStatus.BAD_REQUEST);
            }

            // Create custom filename with user email (sanitized)
            String sanitizedEmail = user.getEmail().replace("@", "_").replace(".", "_");
            String customFileName = "avatar_" + sanitizedEmail;
            String avatarUrl = uploadFile.uploadFileOnCloudinary(avatarFile, customFileName);
            user.setAvatar(avatarUrl);
        }

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserResponse.class);
    }

    @Transactional
    public void updatePassword(PasswordUpdateRequest passwordUpdateRequest) {
        String email = SecurityUtil.getCurrentUserLogin()
                .orElseThrow(() -> new NotFoundException("Không tìm thấy user"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User không tồn tại"));

        // Check if user is deleted
        if (user.getStatus() != null && user.getStatus().equals(Status.DELETED)) {
            throw new CustomException("User đã bị xoá", HttpStatus.BAD_REQUEST);
        }

        // Check if user is social login (can't change password)
        if (user.getType() != null && !user.getType().isEmpty()) {
            throw new CustomException("Tài khoản đăng nhập qua mạng xã hội không thể đổi mật khẩu",
                    HttpStatus.BAD_REQUEST);
        }

        // Verify current password
        if (!passwordEncoder.matches(passwordUpdateRequest.getCurrentPassword(), user.getPassword())) {
            throw new CustomException("Mật khẩu hiện tại không đúng", HttpStatus.BAD_REQUEST);
        }

        // Check if new password is same as current password
        if (passwordEncoder.matches(passwordUpdateRequest.getNewPassword(), user.getPassword())) {
            throw new CustomException("Mật khẩu mới không được giống mật khẩu hiện tại", HttpStatus.BAD_REQUEST);
        }

        // Update password
        user.setPassword(passwordEncoder.encode(passwordUpdateRequest.getNewPassword()));
        userRepository.save(user);
    }
}
