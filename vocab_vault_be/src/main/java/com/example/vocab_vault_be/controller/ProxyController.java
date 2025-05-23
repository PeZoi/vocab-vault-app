package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.service.ProxyService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/proxy")
public class ProxyController {
    private final ProxyService proxyService;

    @GetMapping("/suggestions-en")
    public ResponseEntity<JsonNode> fetchSuggestionsEn(@RequestParam(name = "prefix") String prefix) {
        return ResponseEntity.ok(proxyService.fetchSuggestionsEn(prefix));
    }

    @GetMapping("/suggestions-vi")
    public ResponseEntity<JsonNode> fetchSuggestionsVi(@RequestParam(name = "word") String word, @RequestParam(name =
            "prefix") String prefix) {
        return ResponseEntity.ok(proxyService.fetchSuggestionsVi(word, prefix));
    }

    @GetMapping("/generate-word")
    public ResponseEntity<JsonNode> generateWord(@RequestParam(name = "word") String word) {
        return ResponseEntity.ok(proxyService.generateWord(word));
    }

    @PostMapping("/check-paragraph")
    public ResponseEntity<JsonNode> checkParagraph(@RequestPart("paragraph") String paragraph) {
        return ResponseEntity.ok(proxyService.checkParagraph(paragraph));
    }

    @GetMapping("/sound")
    public ResponseEntity<byte[]> getSound(@RequestParam(name = "word") String word) {
        byte[] audio = proxyService.getSoundForWord(word);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        return ResponseEntity.ok().headers(headers).body(audio);
    }
}
