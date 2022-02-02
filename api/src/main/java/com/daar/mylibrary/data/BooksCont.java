package com.daar.mylibrary.data;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

/**
 * <h1>Books Content</h1>
 * Representing the content of a book. It is stored on a ElasticSearch database to allow a quick and effective search
 * @see Books
 * @author Alexandre Em
 */
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

    public String getContent() {
        return content;
    }
}
