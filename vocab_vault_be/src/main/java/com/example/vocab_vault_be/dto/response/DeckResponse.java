package com.example.vocab_vault_be.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeckResponse {
    private Long id;
    private String title;
    private String description;
    @JsonProperty("isPublic")
    private boolean isPublic;
    private Instant createAt;
    private Instant updatedAt;

    @JsonProperty("user")
    private DeckUser deckUser;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DeckUser {
        private Long id;
        private String fullName;
        private String email;
        private String avatar;
    }
}
