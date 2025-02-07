package com.example.vocab_vault_be.utils;

import com.example.vocab_vault_be.dto.CustomMultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class CommonFunction {

    public static MultipartFile convertUrlToMultipartFile(String imageUrl, String fileName) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<byte[]> response = restTemplate.getForEntity(imageUrl, byte[].class);

        if (response.getStatusCode().is2xxSuccessful()) {
            response.getBody();
            byte[] imageBytes = response.getBody();
            return new CustomMultipartFile(imageBytes, fileName, "image/jpeg");
        }

        throw new IOException("Failed to download image from URL: " + imageUrl);
    }
}
