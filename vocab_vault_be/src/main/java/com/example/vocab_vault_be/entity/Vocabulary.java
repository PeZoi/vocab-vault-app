package com.example.vocab_vault_be.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String origin;
    private String define;
    private String ipa;
    @Column(name = "parts_of_speech")
    private String partsOfSpeech;
    private String note;
    private String audio;
    private String level;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    private Deck deck;

    @OneToMany(mappedBy = "vocabulary", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<Example> examples;
}
