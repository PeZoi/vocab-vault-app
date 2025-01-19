package com.example.vocab_vault_be.service;

import com.example.vocab_vault_be.dto.request.DeckRequest;
import com.example.vocab_vault_be.dto.response.DeckResponse;
import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.User;
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
        deckResponse.setDeckUser(modelMapper.map(user, DeckResponse.DeckUser.class));
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

    private List<DeckResponse> mapDecksToDeckResponses(List<Deck> deckList) {
        List<DeckResponse> deckResponseList = new ArrayList<>();
        deckList.forEach(deck -> {
            DeckResponse deckResponse = modelMapper.map(deck, DeckResponse.class);
            deckResponse.setDeckUser(modelMapper.map(deck.getUser(), DeckResponse.DeckUser.class));
            deckResponseList.add(deckResponse);
        });
        deckResponseList.sort((d1, d2) -> d2.getCreateAt().compareTo(d1.getCreateAt()));
        return deckResponseList;
    }
}
