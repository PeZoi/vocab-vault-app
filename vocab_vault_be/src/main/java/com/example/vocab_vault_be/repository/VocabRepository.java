package com.example.vocab_vault_be.repository;

import com.example.vocab_vault_be.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
}
