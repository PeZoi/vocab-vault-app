package com.example.vocab_vault_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private String en;
    @Lob
    private String vi;

    @ManyToOne
    @JoinColumn(name = "vocabulary_id")
    private Vocabulary vocabulary;
}
