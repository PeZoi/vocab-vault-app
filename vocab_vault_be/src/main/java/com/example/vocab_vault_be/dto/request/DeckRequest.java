package com.example.vocab_vault_be.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeckRequest {
    private String title;
    private String description;
    @JsonProperty("isPublic")
    private boolean isPublic;
}
