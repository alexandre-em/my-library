package com.daar.mylibrary.dto.request;

import com.daar.mylibrary.exception.BadRequestException;

public class BooksRequest {
    public String title;
    public int year;
    public String language;
    public String authors;

    public BooksRequest(String title, int year, String language, String authors) {
        this.title=title;
        this.authors=authors;
        this.year=year;
        this.language=language;
    }

    public void isEmpty() throws BadRequestException {
        if (title == null && year == 0 && language == null && authors == null) throw new BadRequestException("There is no value");
    }
    public void allPropsMandatory() throws BadRequestException {
        if (title == null || year == 0 || language == null || authors == null) throw new BadRequestException("There is no value");
    }
}
