package com.daar.mylibrary.data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private final String bookId=UUID.randomUUID().toString(); // public id
    @NotNull(message = "A title is required")
    @Column(name="TITLE", length=8192)
    private String title;
    private int year;
    private String language;
    @NotNull(message = "A content is required")
    @Column(columnDefinition = "LONGTEXT")
    private String content;
    @Column(name = "DELETED_AT")
    private Timestamp deletedAt;

    @ManyToOne
    private Authors author;

    public Books() {}
    public Books(String title, int year, String language, String content, Authors author) {
        this.title=title;
        this.year=year;
        this.language=language;
        this.content=content;
        this.author=author;
        this.deletedAt=null;
    }

    public String getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }

    public String getAuthorsId() {
        return author.getAuthorId();
    }

    public String getAuthorsName() {
        return author.getName();
    }

    public String getLanguage() {
        return language;
    }
    public String getContent() {
        return content;
    }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }
    public Timestamp getDeletedAt() {
        return deletedAt;
    }
}
