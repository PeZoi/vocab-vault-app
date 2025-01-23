package com.example.vocab_vault_be.dto.vocab;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VocabResponse {
    private Long id;
    private String origin;
    private String define;
    private String ipa;
    private String partsOfSpeech;
    private String note;
    private String audio;
    private String level;
    private List<ExampleResponse> examples;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ExampleResponse {
        private Long id;
        private String en;
        private String vi;
    }
}
