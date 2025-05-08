package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.flashcard.FlashCardDTO;
import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.Vocabulary;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.DeckRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FlashCardService {
    private final DeckRepository deckRepository;
    private final ModelMapper modelMapper;

    public FlashCardDTO getFlashCardById(Long id) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("ID không tồn tại"));
        List<VocabDTO> vocabResponseList = new ArrayList<>();
        for (Vocabulary vocabulary : deck.getVocabularies()) {
            vocabResponseList.add(modelMapper.map(vocabulary, VocabDTO.class));
        }
        return FlashCardDTO.builder()
                .id(deck.getId())
                .title(deck.getTitle())
                .vocabList(vocabResponseList)
                .deckUser(modelMapper.map(deck.getUser(), UserShortenResponse.class)).build();
    }
}
