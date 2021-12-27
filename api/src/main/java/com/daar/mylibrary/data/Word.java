package com.daar.mylibrary.data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "word")
public class Word {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private final String wordId= UUID.randomUUID().toString();
    @NotNull
    @Column(unique = true)
    private String word;

    public Word() {}
    public Word(String word) {
        this.word=word;
    }

    public Long getId() {
        return id;
    }

    public String getWord() {
        return this.word;
    }
}
