package com.daar.mylibrary.data;

import javax.persistence.*;

@Entity
@Table(name = "word_index")
public class WordIndex {
    @EmbeddedId
    private WordIndexId id;
    private int occurrence;

    public WordIndex() {}
    public WordIndex(Books book, Word word, int occurrence) {
        this.id = new WordIndexId(book, word);
        this.occurrence=occurrence;
    }
}
