package com.example.vocab_vault_be.repository;

import com.example.vocab_vault_be.entity.Deck;
import com.example.vocab_vault_be.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepository extends JpaRepository<Deck, Long> {
    List<Deck> findAllByIsPublic(boolean isPublic);
    List<Deck> findAllByUser(User user);
}
