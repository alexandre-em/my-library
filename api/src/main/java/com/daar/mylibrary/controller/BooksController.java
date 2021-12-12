package com.daar.mylibrary.controller;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path="/books")
public class BooksController {
    @Autowired
    private BooksRepository booksRepository;

    @PostMapping
    public ResponseEntity<Books> addBook(@RequestBody Books book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(booksRepository.save(book));
    }
}
