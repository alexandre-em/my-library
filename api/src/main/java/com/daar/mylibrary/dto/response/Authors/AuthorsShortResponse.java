package com.daar.mylibrary.dto.response.Authors;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.dto.response.Response;

public class AuthorsShortResponse implements Response {
    private Authors author;

    public AuthorsShortResponse(Authors author) {
        this.author=author;
    }

    public String getId() {
        return author.getAuthorId();
    }

    public String getName() {
        return author.getName();
    }
}
