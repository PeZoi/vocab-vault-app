package com.example.vocab_vault_be.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.example.vocab_vault_be.dto.multipleChoice.MultipleChoiceDTO;
import com.example.vocab_vault_be.dto.multipleChoice.ResultMultipleChoiceDTO;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.Vocabulary;
import com.example.vocab_vault_be.exception.CustomException;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.DeckRepository;
import com.example.vocab_vault_be.repository.VocabRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MultipleChoiceService {
    private final DeckRepository deckRepository;
    private final VocabRepository vocabRepository;
    private final int keyVirtual = 2003;

    public List<MultipleChoiceDTO> getListMultipleChoiceId(Long id, Integer totalQuestion) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("ID không tồn tại"));
        if (deck.getVocabularies().size() < 4) {
            throw new CustomException("Bộ đề phải có ít nhất 4 từ mở khoá tính năng này",
                    HttpStatus.UNPROCESSABLE_ENTITY);
        }

        List<MultipleChoiceDTO> multipleChoiceDTOList = new ArrayList<>();
        List<Vocabulary> vocabularies = deck.getVocabularies();
        Collections.shuffle(vocabularies);

        // Get all vocabularies of deck
        vocabularies.stream().limit(totalQuestion).toList().forEach(vocabulary -> {
            MultipleChoiceDTO multipleChoiceDTO = new MultipleChoiceDTO();
            List<MultipleChoiceDTO.Answers> answerList = new ArrayList<>();

            multipleChoiceDTO.setId(vocabulary.getId());
            multipleChoiceDTO.setTerm(vocabulary.getOrigin());

            // This is answer correct
            MultipleChoiceDTO.Answers answerCorrect = new MultipleChoiceDTO.Answers();
            answerCorrect.setAnswer(vocabulary.getDefine());
            answerCorrect.setId(vocabulary.getId() + keyVirtual);
            answerList.add(answerCorrect);

            // Get all vocabularies, but ignore vocabulary is correct. That's make answers
            // to question
            List<Vocabulary> vocabularyList = new ArrayList<>(deck.getVocabularies().stream()
                    .filter(v -> !Objects.equals(v.getId(), vocabulary.getId())).toList());
            Collections.shuffle(vocabularyList);

            // Get 3 vocabularies
            List<Vocabulary> vocabularyRandom3List = vocabularyList.stream()
                    .limit(3).toList();

            // Put answers to answerList
            vocabularyRandom3List.forEach(vocabularyRandom3 -> {
                MultipleChoiceDTO.Answers answerIncorrect = MultipleChoiceDTO.Answers.builder()
                        .answer(vocabularyRandom3.getDefine())
                        .id(vocabularyRandom3.getId() + keyVirtual).build();
                answerList.add(answerIncorrect);
            });
            Collections.shuffle(answerList);
            multipleChoiceDTO.setAnswers(answerList);
            multipleChoiceDTOList.add(multipleChoiceDTO);
        });

        return multipleChoiceDTOList;
    }

    public List<ResultMultipleChoiceDTO> getResultMultipleChoice(List<Long> questionIdList) {
        List<ResultMultipleChoiceDTO> resultMultipleChoiceDTOList = new ArrayList<>();
        List<Vocabulary> vocabularyList = vocabRepository.findByIdIn(questionIdList);
        vocabularyList.forEach(vocabulary -> {
            ResultMultipleChoiceDTO resultMultipleChoiceDTO = new ResultMultipleChoiceDTO();
            resultMultipleChoiceDTO.setQuestionId(vocabulary.getId());
            resultMultipleChoiceDTO.setAnswerId(vocabulary.getId() + keyVirtual);
            resultMultipleChoiceDTOList.add(resultMultipleChoiceDTO);
        });
        return resultMultipleChoiceDTOList;
    }

    public Boolean isEligibleToUnlockFeature(Long id) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("ID không tồn tại"));
        return deck.getVocabularies().size() >= 4;
    }
}
