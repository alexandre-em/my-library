package com.daar.mylibrary.dto.response.Books;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.dto.response.Response;

public class BooksResponse implements Response {
    private Books book;

    public BooksResponse(Books book) {
        this.book = book;
    }

    public String getId() {
        return book.getBookId();
    }

    public String getTitle() {
        return book.getTitle();
    }

    public int getYear() {
        return book.getYear();
    }

    public String getAuthor() {
        return book.getAuthorsName();
    }

    public String getLanguage() {
        return book.getLanguage();
    }
}
