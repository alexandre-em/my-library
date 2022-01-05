package com.daar.mylibrary.dto.request;

import java.util.List;

public class BookListRequest {
    private List<String> bookIds;

    public List<String> getBookIds() {
        return bookIds;
    }

    public void setBookIds(List<String> bookIds) {
        this.bookIds = bookIds;
    }
}
