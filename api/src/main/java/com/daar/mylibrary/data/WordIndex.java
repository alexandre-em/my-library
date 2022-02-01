package com.daar.mylibrary.data;

import javax.persistence.*;

/**
 * <h1>WordIndex model</h1>
 * Representing a word of Book, it allows to know the occurrence of the word on a book
 * @see Books
 * @author Alexandre Em
 */
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

    public Books getBook() {
        return this.id.getBook();
    }
}
