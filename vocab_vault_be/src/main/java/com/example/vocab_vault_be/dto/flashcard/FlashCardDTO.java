package com.example.vocab_vault_be.dto.flashcard;

import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlashCardDTO {
    private Long id;
    private String title;
    private List<VocabDTO> vocabList;
    @JsonProperty("user")
    private UserShortenResponse deckUser;
}
