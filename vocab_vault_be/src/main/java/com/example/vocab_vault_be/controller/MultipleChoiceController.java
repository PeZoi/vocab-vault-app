package com.example.vocab_vault_be.controller;

import com.example.vocab_vault_be.dto.multipleChoice.MultipleChoiceDTO;
import com.example.vocab_vault_be.dto.multipleChoice.ResultMultipleChoiceDTO;
import com.example.vocab_vault_be.service.MultipleChoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/multiple-choices")
public class MultipleChoiceController {
    private final MultipleChoiceService multipleChoiceService;

    @GetMapping("/get/{id}")
    public ResponseEntity<List<MultipleChoiceDTO>> getCardMatch(@PathVariable("id") Long id, @RequestParam(name = "totalQuestion") Integer totalQuestion) {
        return ResponseEntity.ok(multipleChoiceService.getListMultipleChoiceId(id, totalQuestion));
    }

    @PostMapping("/get-result")
    public ResponseEntity<List<ResultMultipleChoiceDTO>> getCardMatch(@RequestBody List<Long> questionsIdList) {
        return ResponseEntity.ok(multipleChoiceService.getResultMultipleChoice(questionsIdList));
    }

    @GetMapping("/is-unlock/{id}")
    public ResponseEntity<Boolean> isEligibleToUnlockFeature(@PathVariable("id") Long id) {
        return ResponseEntity.ok(multipleChoiceService.isEligibleToUnlockFeature(id));
    }
}
