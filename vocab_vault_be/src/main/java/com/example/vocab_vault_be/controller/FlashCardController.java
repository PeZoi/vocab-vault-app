package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.flashcard.FlashCardDTO;
import com.example.vocab_vault_be.service.FlashCardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flash-cards")
public class FlashCardController {
    private final FlashCardService flashCardService;

    public FlashCardController(FlashCardService flashCardService) {
        this.flashCardService = flashCardService;
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<FlashCardDTO> getDeck(@PathVariable Long id) {
        return ResponseEntity.ok(flashCardService.getFlashCardById(id));
    }
}
