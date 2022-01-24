package com.daar.mylibrary.data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "auth0_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String userId;
    private String keywords;
    @Column(name = "DELETED_AT")
    private Timestamp deletedAt;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Books> readList;

    public User(String userId) {
        this.userId=userId;
        this.readList=new ArrayList<>();
        this.keywords="";
    }

    public User() { }

    public Long getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public List<Books> getReadList() {
        return readList;
    }

    public Timestamp getDeletedAt() {
        return deletedAt;
    }

    public String getKeywords() {
        return keywords;
    }

    public void addToReadList(Books book) {
        readList.add(book);
    }

    public void addKeyword(String keyword) {
        if (this.keywords != null)
            this.keywords=this.keywords + "," + keyword;
        else
            this.keywords=keyword;
    }

    public void setDeletedAt(Timestamp deletedAt) {
        this.deletedAt = deletedAt;
    }
}
