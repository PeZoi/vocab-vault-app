package com.example.vocab_vault_be.repository;

import com.example.vocab_vault_be.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabRepository extends JpaRepository<Vocabulary, Long> {
    List<Vocabulary> findByIdIn(List<Long> idList);
}
