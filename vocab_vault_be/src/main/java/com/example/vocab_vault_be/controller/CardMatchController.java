package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.cardMatch.CardMatchDTO;
import com.example.vocab_vault_be.service.CardMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/card-matches")
public class CardMatchController {
    private final CardMatchService cardMatchService;

    @GetMapping("/get/{id}")
    public ResponseEntity<CardMatchDTO> getCardMatch(@PathVariable("id") Long id) {
        return ResponseEntity.ok(cardMatchService.getListCardMatchById(id));
    }

    @GetMapping("/is-unlock/{id}")
    public ResponseEntity<Boolean> isEligibleToUnlockFeature(@PathVariable("id") Long id) {
        return ResponseEntity.ok(cardMatchService.isEligibleToUnlockFeature(id));
    }
}
