package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.response.UserResponse;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.security.SecurityUtil;
import com.example.vocab_vault_be.utils.enums.Status;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email không tồn tại"));
    }

    public void updateRefreshTokenUser(String refreshToken, String email) {
        User userInDB = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email không tồn " + "tại"));
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
}
