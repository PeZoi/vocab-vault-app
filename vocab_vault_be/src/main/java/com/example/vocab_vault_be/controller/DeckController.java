package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.request.DeckRequest;
import com.example.vocab_vault_be.dto.response.DeckResponse;
import com.example.vocab_vault_be.service.DeckService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
public class DeckController {
    private final DeckService deckService;

    public DeckController(DeckService deckService) {
        this.deckService = deckService;
    }

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
}
