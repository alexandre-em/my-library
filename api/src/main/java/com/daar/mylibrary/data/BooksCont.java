package com.daar.mylibrary.data;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "books")
public class BooksCont {
    @Id
    private String id;
    private String content;

    public BooksCont(String content) {
        this.content=content;
    }

    public String getId() {
        return id;
    }
}
