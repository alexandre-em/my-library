package com.daar.mylibrary.response.Books;

import com.daar.mylibrary.data.BooksCont;
import com.daar.mylibrary.response.Response;

public class BooksContentResponse implements Response {
    private BooksCont booksContent;

    public BooksContentResponse(BooksCont content) {
        this.booksContent = content;
    }

    public String getBooksId() {
        return booksContent.getId();
    }
}
