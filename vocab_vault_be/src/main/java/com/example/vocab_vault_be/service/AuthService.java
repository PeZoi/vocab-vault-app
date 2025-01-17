package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.request.LoginRequest;
import com.example.vocab_vault_be.dto.request.UserRequest;
import com.example.vocab_vault_be.dto.response.LoginResponse;
import com.example.vocab_vault_be.dto.response.UserResponse;
import com.example.vocab_vault_be.dto.response.UserReturnJwt;
import com.example.vocab_vault_be.entity.Role;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.exception.CustomException;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.RoleRepository;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.security.SecurityUtil;
import com.example.vocab_vault_be.utils.TemplateEmail;
import com.example.vocab_vault_be.utils.enums.Roles;
import com.example.vocab_vault_be.utils.enums.Status;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Random;

@Service
public class AuthService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final SecurityUtil securityUtil;
    private final EmailService emailService;

    @Value("${vocab.vault.domain.frontend}")
    private String domainFE;

    public AuthService(UserService userService, UserRepository userRepository, RoleRepository roleRepository,
                       ModelMapper modelMapper, PasswordEncoder passwordEncoder,
                       AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil, EmailService emailService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
        this.emailService = emailService;
    }

    public UserResponse register(UserRequest userRequest) {
        // Kiểm tra điều kiện
        if (userRepository.existsByEmail(userRequest.getEmail())) {
            throw new CustomException("Email đã tồn tại", HttpStatus.CONFLICT);
        }

        // Lấy ra role mặc định khi user đăng ký
        Role role = roleRepository.findByName(String.valueOf(Roles.ROLE_USER));
        //   Tạo ra random code để verify account
        Random random = new Random();
        String randomCode = String.format("%06d", random.nextInt(1000000));

        User user = modelMapper.map(userRequest, User.class);
        //   Gán mặc định các thuộc cho user
        user.setAvatar("https://res.cloudinary.com/dqnoopa0x/image/upload/v1712482876/ooozzfj7t7p1zokgonni.jpg");
        user.setVerificationCode(randomCode);
        user.setEnabled(false);
        user.setStatus(Status.ACTIVE);
        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //   Link để active account
        String verifyURL = domainFE + "/auth/verify?code=" + user.getVerificationCode() + "&email=" + user.getEmail();

        // Gửi email
        emailService.sendEmail(randomCode, TemplateEmail.SUBJECT_REGISTER, TemplateEmail.EMAIL_TEMPLATE_REGISTER, user);
        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserResponse.class);
    }

    @Transactional
    public LoginResponse login(LoginRequest loginRequest) {
        // Nạp input gồm username/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
        // Xác thực người dùng => cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // Lưu người dùng vừa đăng nhập vào context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Lấy ra thông tin cơ bản của user
        User user = userRepository.findByEmail(loginRequest.getEmail()).get();
        UserReturnJwt userReturnJwt = modelMapper.map(user, UserReturnJwt.class);
        userReturnJwt.setRoleName(user.getRole().getName());

        // Tạo access token
        String accessToken = securityUtil.createAccessToken(authentication.getName(), userReturnJwt);
        // Tạo refresh token
        String refreshToken = securityUtil.createRefreshToken(userReturnJwt);
        // Cập nhật refresh token cho user trong db
        userService.updateRefreshTokenUser(refreshToken, user.getEmail());

        return new LoginResponse(accessToken, userReturnJwt);
    }

    public void logout() {
        String email = SecurityUtil.getCurrentUserLogin().isPresent() ? SecurityUtil.getCurrentUserLogin().get() : "";
        if (email.equals("")) {
            throw new NotFoundException("Access token không hợp lệ");
        }

        userService.updateRefreshTokenUser(null, email);
    }

    public String verify(String verifyCode, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email không tồn tại"));

        if (user.getVerificationCode() == null) {
            throw new CustomException("Tài khoản đã được kích hoạt", HttpStatus.CONFLICT);
        } else {
            if (user.getVerificationCode().equals(verifyCode)) {
                user.setEnabled(true);
                userRepository.save(user);
                return "Tài khoản kích hoạt thành công";
            } else {
                throw new CustomException("Sai mã kích hoạt", HttpStatus.BAD_REQUEST);
            }
        }
    }
}
