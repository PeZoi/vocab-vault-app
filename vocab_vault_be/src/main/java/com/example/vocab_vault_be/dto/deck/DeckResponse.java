package com.example.vocab_vault_be.dto.deck;

import com.example.vocab_vault_be.dto.vocab.VocabResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.Instant;
import java.util.List;

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

    private List<VocabResponse> vocabList;

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
