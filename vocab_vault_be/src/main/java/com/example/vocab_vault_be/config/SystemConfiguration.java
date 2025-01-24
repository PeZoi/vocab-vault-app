package com.example.vocab_vault_be.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class SystemConfiguration {
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
