package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.deck.DeckRequest;
import com.example.vocab_vault_be.dto.deck.DeckResponse;
import com.example.vocab_vault_be.dto.user.UserShortenResponse;
import com.example.vocab_vault_be.dto.vocab.VocabDTO;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.User;
import com.example.vocab_vault_be.entity.Vocabulary;
import com.example.vocab_vault_be.exception.NotFoundException;
import com.example.vocab_vault_be.repository.DeckRepository;
import com.example.vocab_vault_be.repository.UserRepository;
import com.example.vocab_vault_be.security.SecurityUtil;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class DeckService {
    private final DeckRepository deckRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public DeckService(DeckRepository deckRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.deckRepository = deckRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    public DeckResponse create(DeckRequest deckRequest) {
        Deck deck = modelMapper.map(deckRequest, Deck.class);
        String email = SecurityUtil.getCurrentUserLogin().orElseThrow(() -> new UsernameNotFoundException(
                "Không tìm thấy user"));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email không " +
                "tồn tại"));

        deck.setUser(user);
        Deck deckSaved = deckRepository.save(deck);
        DeckResponse deckResponse = modelMapper.map(deckSaved, DeckResponse.class);
        deckResponse.setDeckUser(modelMapper.map(user, UserShortenResponse.class));
        return deckResponse;
    }

    public List<DeckResponse> getAllDeckPublic() {
        List<Deck> deckList = deckRepository.findAllByIsPublic(true);
        return mapDecksToDeckResponses(deckList);
    }

    public List<DeckResponse> getAllMyDeck() {
        String email = SecurityUtil.getCurrentUserLogin().orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy user"));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email không tồn tại"));
        List<Deck> deckList = deckRepository.findAllByUser(user);
        return mapDecksToDeckResponses(deckList);
    }

    public DeckResponse getDeckById(Long id) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("Id không tồn tại"));
        List<VocabDTO> vocabResponseList = new ArrayList<>();
        for (Vocabulary vocabulary : deck.getVocabularies()) {
            vocabResponseList.add(modelMapper.map(vocabulary, VocabDTO.class));
        }
        DeckResponse deckResponse = modelMapper.map(deck, DeckResponse.class);
        deckResponse.setDeckUser(modelMapper.map(deck.getUser(), UserShortenResponse.class));
        deckResponse.setVocabList(vocabResponseList);

        return deckResponse;
    }

    public String deleteById(Long id) {
        try {
            Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("Id không tồn tại"));
            deckRepository.delete(deck);
            return "Xoá thành công";
        } catch (Exception e) {
            return "Có lỗi xảy ra! Xoá thất bại";
        }
    }

    public DeckResponse update(Long id, DeckRequest deckRequest) {
        Deck deck = deckRepository.findById(id).orElseThrow(() -> new NotFoundException("Id không tồn tại"));
        deck.setPublic(deckRequest.isPublic());
        deck.setTitle(deckRequest.getTitle());
        deck.setDescription(deckRequest.getDescription());
        Deck deckSaved = deckRepository.save(deck);
        DeckResponse deckResponse = modelMapper.map(deckSaved, DeckResponse.class);
        deckResponse.setDeckUser(modelMapper.map(deckSaved.getUser(), UserShortenResponse.class));
        return deckResponse;
    }

    private List<DeckResponse> mapDecksToDeckResponses(List<Deck> deckList) {
        List<DeckResponse> deckResponseList = new ArrayList<>();
        deckList.forEach(deck -> {
            DeckResponse deckResponse = modelMapper.map(deck, DeckResponse.class);
            deckResponse.setTotalVocabulary(deck.getVocabularies().size());
            deckResponse.setDeckUser(modelMapper.map(deck.getUser(), UserShortenResponse.class));
            deckResponseList.add(deckResponse);
        });
        deckResponseList.sort((d1, d2) -> d2.getCreateAt().compareTo(d1.getCreateAt()));
        return deckResponseList;
    }
}
