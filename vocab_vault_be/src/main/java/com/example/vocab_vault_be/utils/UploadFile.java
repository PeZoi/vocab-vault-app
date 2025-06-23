package com.example.vocab_vault_be.utils;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.vocab_vault_be.exception.CustomException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class UploadFile {
    private final Cloudinary cloudinary;

    public String uploadFileOnCloudinary(MultipartFile file) {
        try {
            Map r = cloudinary.uploader().upload(file.getBytes(), Cloudinary.asMap("resource_type", "auto",
                    "public_id", file.getName()));
            return (String) r.get("secure_url");
        } catch (IOException e) {
            throw new CustomException("Tải file lên cloud không thành công!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
