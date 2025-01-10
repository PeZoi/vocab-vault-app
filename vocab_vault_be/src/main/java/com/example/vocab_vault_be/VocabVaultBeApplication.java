package com.example.vocab_vault_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class VocabVaultBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(VocabVaultBeApplication.class, args);
    }

}
