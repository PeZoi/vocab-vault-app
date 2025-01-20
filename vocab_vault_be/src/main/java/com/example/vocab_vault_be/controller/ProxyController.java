package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.service.ProxyService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/proxy")
public class ProxyController {
    private final ProxyService proxyService;

    public ProxyController(ProxyService proxyService) {
        this.proxyService = proxyService;
    }

    @GetMapping("/suggestions-en")
    public ResponseEntity<JsonNode> fetchSuggestionsEn(@RequestParam(name = "prefix") String prefix) {
        return ResponseEntity.ok(proxyService.fetchSuggestionsEn(prefix));
    }

    @GetMapping("/suggestions-vi")
    public ResponseEntity<JsonNode> fetchSuggestionsVi(@RequestParam(name = "word") String word) {
        return ResponseEntity.ok(proxyService.fetchSuggestionsVi(word));
    }
}
