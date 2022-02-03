package com.daar.mylibrary.dto.response.Books;

import com.daar.mylibrary.data.BookScoring;
import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.dto.response.Response;

public class BookScoringResponse implements Response {
    public Long score;
    public String title;
    public String author;
    public String language;
    public int year;

    public BookScoringResponse(BookScoring bookScoring) {
        score = bookScoring.getScore();
        Books book = bookScoring.getBooks();
        title = book.getTitle();
        author = book.getAuthorsName();
        language = book.getLanguage();
        year = book.getYear();
    }
}
