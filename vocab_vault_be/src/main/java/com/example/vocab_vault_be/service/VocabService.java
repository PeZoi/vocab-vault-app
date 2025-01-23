package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.vocab.VocabRequest;
import com.example.vocab_vault_be.dto.vocab.VocabResponse;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.Example;
import com.example.vocab_vault_be.entity.Vocabulary;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.DeckRepository;
import com.example.vocab_vault_be.repository.VocabRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class VocabService {
    private final VocabRepository vocabRepository;
    private final DeckRepository deckRepository;
    private final ModelMapper modelMapper;

    public VocabService(VocabRepository vocabRepository, DeckRepository deckRepository, ModelMapper modelMapper) {
        this.vocabRepository = vocabRepository;
        this.deckRepository = deckRepository;
        this.modelMapper = modelMapper;
    }

    public VocabResponse create(VocabRequest vocabRequest) {
        Deck deck = deckRepository.findById(vocabRequest.getDeckId()).orElseThrow(() -> new NotFoundException("ID bộ " +
                "đề không tồn tại"));
        Vocabulary vocabulary = modelMapper.map(vocabRequest, Vocabulary.class);
        vocabulary.setId(null);
        vocabulary.setDeck(deck);
        for (Example example : vocabulary.getExamples()) {
            example.setVocabulary(vocabulary);
        }
        Vocabulary vocabularySaved = vocabRepository.save(vocabulary);

        return modelMapper.map(vocabularySaved, VocabResponse.class);
    }

    public String delete(Long id) {
        Vocabulary vocabulary = vocabRepository.findById(id).orElseThrow(() -> new NotFoundException("ID từ không " +
                "tồn tại"));
        try {
            vocabRepository.delete(vocabulary);
            return "Xoá thành công";
        } catch (Exception e) {
            return "Xoá thất bại";
        }
    }
}
