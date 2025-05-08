package com.example.vocab_vault_be.dto.deck;

import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
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
    private int totalVocabulary;

    @JsonProperty("user")
    private UserShortenResponse deckUser;

    private List<VocabDTO> vocabList;
}
