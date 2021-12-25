package com.daar.mylibrary.data;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class WordIndexId implements Serializable {
    private static final long serialVersionUID = -2518202727203311655L;
    @ManyToOne(optional = false)
    @JoinColumn(name = "book_id", nullable = false)
    private Books book;
    @ManyToOne(optional = false)
    @JoinColumn(name = "word_id", nullable = false)
    private Word word;

    public WordIndexId(Books book, Word word) {
        this.book=book;
        this.word=word;
    }

    public WordIndexId() { }
}
