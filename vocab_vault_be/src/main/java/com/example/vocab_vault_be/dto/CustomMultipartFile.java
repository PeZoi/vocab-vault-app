package com.example.vocab_vault_be.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

@Getter
@Setter
@AllArgsConstructor
public class CustomMultipartFile implements MultipartFile {
    private final byte[] content;
    private final String fileName;
    private final String contentType;

    @Override
    public String getName() {
        return fileName;
    }

    @Override
    public String getOriginalFilename() {
        return fileName;
    }

    @Override
    public String getContentType() {
        return contentType;
    }

    @Override
    public boolean isEmpty() {
        return content.length == 0;
    }

    @Override
    public long getSize() {
        return content.length;
    }

    @Override
    public byte[] getBytes() {
        return content;
    }

    @Override
    public InputStream getInputStream() {
        return new ByteArrayInputStream(content);
    }

    @Override
    public void transferTo(File dest) throws IOException {
        try (FileOutputStream out = new FileOutputStream(dest)) {
            out.write(content);
        }
    }
}
