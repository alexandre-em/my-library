package com.daar.mylibrary.response.Authors;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.response.Books.BooksShortResponse;
import com.daar.mylibrary.response.Response;

import java.util.List;
import java.util.stream.Collectors;

public class AuthorsResponse implements Response {
    private final Authors author;

    public AuthorsResponse(Authors author) {
        this.author=author;
    }

    public String getId() {
        return author.getAuthorId();
    }

    public String getName() {
        return author.getName();
    }

    public List<BooksShortResponse> getBooks() {
        return author.getBooks().stream().map(BooksShortResponse::new).collect(Collectors.toList());
    }
}
