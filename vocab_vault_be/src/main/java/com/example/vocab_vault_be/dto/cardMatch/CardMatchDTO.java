package com.example.vocab_vault_be.dto.cardMatch;

import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardMatchDTO {
    private Long id;
    private String title;
    private List<VocabDTO> vocabList;
    @JsonProperty("user")
    private UserShortenResponse deckUser;
}
