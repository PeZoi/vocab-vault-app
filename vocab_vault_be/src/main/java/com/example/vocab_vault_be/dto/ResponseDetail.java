package com.example.vocab_vault_be.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseDetail<T> {
    private int status;
    private String error;
    private Object message;
    private T data;
}

