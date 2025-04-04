package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.deck.DeckRequest;
import com.example.vocab_vault_be.dto.deck.DeckResponse;
import com.example.vocab_vault_be.service.DeckService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/decks")
public class DeckController {
    private final DeckService deckService;

    @PostMapping("/create")
    public ResponseEntity<DeckResponse> create(@RequestBody DeckRequest deckRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(deckService.create(deckRequest));
    }

    @GetMapping("/my-decks")
    public ResponseEntity<List<DeckResponse>> getAllMyDecks() {
        return ResponseEntity.ok(deckService.getAllMyDeck());
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<DeckResponse>> getAllDecksPublic() {
        return ResponseEntity.ok(deckService.getAllDeckPublic());
    }

    @GetMapping("/get-deck/{id}")
    public ResponseEntity<DeckResponse> getDeck(@PathVariable Long id) {
        return ResponseEntity.ok(deckService.getDeckById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<DeckResponse> updateDeck(@PathVariable Long id, @RequestBody DeckRequest deckRequest) {
        return ResponseEntity.ok(deckService.update(id, deckRequest));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDeck(@PathVariable Long id) {
        return ResponseEntity.ok(deckService.deleteById(id));
    }
}
