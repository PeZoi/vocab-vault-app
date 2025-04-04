package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.example.vocab_vault_be.service.VocabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vocabs")
public class VocabController {
    private final VocabService vocabService;

    @PostMapping("/create")
    public ResponseEntity<VocabDTO> create(@RequestBody VocabDTO vocabRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(vocabService.create(vocabRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok(vocabService.delete(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<VocabDTO> update(@PathVariable Long id, @RequestBody VocabDTO vocabRequest) {
        return ResponseEntity.ok(vocabService.update(id, vocabRequest));
    }
}
