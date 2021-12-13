package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BooksService {
    @Autowired
    BooksRepository booksRepository;

    public Books addBook(Books book) {
        return booksRepository.save(book);
    }

}
