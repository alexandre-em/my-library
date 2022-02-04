package com.daar.mylibrary.dto.response.Books;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.dto.response.Response;

public class BooksShortResponse implements Response {
    private Books book;

    public BooksShortResponse(Books book) {
        this.book = book;
    }

    public String getId() {
        return book.getBookId();
    }

    public String getTitle() {
        return book.getTitle();
    }

    public String getAuthor() {
        return book.getAuthorsName();
    }

    public String getImage() {
        return book.getImage();
    }

    public int getYear() { return book.getYear(); }
}
