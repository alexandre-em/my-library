package com.daar.mylibrary.data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Authors {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private final String authorId= UUID.randomUUID().toString(); // public id
    @NotNull(message = "Author's name is required")
    private String name;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Books> books;

    public Authors() {
        this.books=new ArrayList<>();
    }
    public Authors(String name) {
        this.name=name;
        this.books=new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public String getAuthorId() {
        return authorId;
    }

    public List<Books> getBooks() {
        return books;
    }

    public void addBooks(Books book) {
        books.add(book);
    }
}
