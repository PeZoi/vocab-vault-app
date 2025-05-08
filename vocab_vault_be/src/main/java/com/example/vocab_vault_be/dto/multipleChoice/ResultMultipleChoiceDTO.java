package com.example.vocab_vault_be.dto.multipleChoice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResultMultipleChoiceDTO {
    private Long questionId;
    private Long answerId;
}
