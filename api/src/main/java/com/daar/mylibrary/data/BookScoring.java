package com.daar.mylibrary.data;

public class BookScoring {
    Long score;
    Books books;

    public BookScoring(Books books, Long score) {
        this.books=books;
        this.score=score;
    }

    public Books getBooks() {
        return books;
    }

    public Long getScore() {
        return score;
    }
}
