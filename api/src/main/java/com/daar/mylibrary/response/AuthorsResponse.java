package com.daar.mylibrary.response;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;

import java.util.List;
import java.util.stream.Collectors;

public class AuthorsResponse implements Response {
    private Authors author;

    public AuthorsResponse(Authors author) {
        this.author=author;
    }

    public String getId() {
        return author.getAuthorId();
    }

    public String getName() {
        return author.getName();
    }

    public List<AuthorBook> getBooks() {
        return author.getBooks().stream().map(AuthorBook::new).collect(Collectors.toList());
    }
}

class AuthorBook {
    private final Books book;

    public AuthorBook(Books book) {
        this.book=book;
    }

    public String getId() {
        return book.getBookId();
    }

    public String getTitle() {
        return book.getTitle();
    }
}
