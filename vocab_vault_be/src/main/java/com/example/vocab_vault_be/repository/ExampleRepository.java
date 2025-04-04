package com.example.vocab_vault_be.repository;

import com.example.vocab_vault_be.entity.Example;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExampleRepository extends JpaRepository<Example, Long> {
}
