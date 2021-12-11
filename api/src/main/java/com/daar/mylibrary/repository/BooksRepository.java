package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import org.springframework.data.repository.CrudRepository;

public interface BooksRepository extends CrudRepository<Books, Long> {
}
