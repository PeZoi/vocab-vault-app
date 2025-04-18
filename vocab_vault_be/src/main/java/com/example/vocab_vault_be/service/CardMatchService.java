package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.cardMatch.CardMatchDTO;
import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.Vocabulary;
import com.example.vocab_vault_be.exception.CustomException;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.DeckRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardMatchService {
    private final DeckRepository deckRepository;
    private final ModelMapper modelMapper;

    public CardMatchDTO getListCardMatchById(Long id) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("ID không tồn tại"));
        if (deck.getVocabularies().size() < 6) {
            throw new CustomException("Bộ đề phải có ít nhất 6 từ mở khoá tính năng này", HttpStatus.UNPROCESSABLE_ENTITY);
        }

        List<VocabDTO> vocabResponseList = new ArrayList<>();
        for (Vocabulary vocabulary : deck.getVocabularies()) {
            vocabResponseList.add(modelMapper.map(vocabulary, VocabDTO.class));
        }

        Collections.shuffle(vocabResponseList);

        return CardMatchDTO.builder()
                .id(deck.getId())
                .title(deck.getTitle())
                .vocabList(vocabResponseList.subList(0, 6))
                .deckUser(modelMapper.map(deck.getUser(), UserShortenResponse.class)).build();
    }

    public Boolean isEligibleToUnlockFeature(Long id) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("ID không tồn tại"));
        return deck.getVocabularies().size() >= 6;
    }
}
