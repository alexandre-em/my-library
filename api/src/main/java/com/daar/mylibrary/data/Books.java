package com.daar.mylibrary.data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "books")
public class Books {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private final String bookId=UUID.randomUUID().toString(); // public id
    private String title;
    private int year;
    private String language;
    private String content;


//    @ManyToOne
//    @JoinColumn(name = "authors_id")
//    private Authors authors;

    public String getBookId() {
        return bookId;
    }

    public String getTitle() {
        return title;
    }

    public int getYear() {
        return year;
    }

//    public Authors getAuthors() {
//        return authors;
//    }
    public String getLanguage() {
        return language;
    }

//    public void setAuthors(Authors authors) {
//        this.authors = authors;
//    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
