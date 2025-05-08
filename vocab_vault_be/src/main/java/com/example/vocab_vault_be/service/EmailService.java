package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.exception.CustomException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    @Value("${vocab.vault.email}")
    private String emailFrom;

    @Async
    public void sendEmail(String verifyCode, String subject, String content, User user) {
        // Lấy ra email chuẩn bị gửi
        String toAddress = user.getEmail();

        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        try {
            helper.setFrom(emailFrom, "Vocab Vault");
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getFullName());
            content = content.replace("[[VERIFY_CODE]]", verifyCode);

            helper.setText(content, true);

            javaMailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new CustomException("Lỗi không gửi được email!", HttpStatus.BAD_REQUEST);
        }

    }
}
