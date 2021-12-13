package com.daar.mylibrary.response;

import com.daar.mylibrary.data.Books;

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
        return book.getAuthorsId();
    }

    public String getLanguage() {
        return book.getLanguage();
    }
}
