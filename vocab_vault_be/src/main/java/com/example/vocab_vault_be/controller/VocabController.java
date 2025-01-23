package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.vocab.VocabRequest;
import com.example.vocab_vault_be.dto.vocab.VocabResponse;
import com.example.vocab_vault_be.service.VocabService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vocabs")
public class VocabController {
    private final VocabService vocabService;

    public VocabController(VocabService vocabService) {
        this.vocabService = vocabService;
    }

    @PostMapping("/create")
    public ResponseEntity<VocabResponse> create(@RequestBody VocabRequest vocabRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vocabService.create(vocabRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> create(@PathVariable Long id) {
        return ResponseEntity.ok(vocabService.delete(id));
    }
}
