package com.example.vocab_vault_be.dto.multipleChoice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MultipleChoiceDTO {
    private Long id;
    private String term;
    private List<Answers> answers;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Answers {
        private Long id;
        private String answer;
    }
}
