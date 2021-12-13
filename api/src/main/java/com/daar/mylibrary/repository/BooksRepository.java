package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BooksRepository extends CrudRepository<Books, Long> {
    Books findBooksById(Long id);
    List<Books> findBooksByAuthorContaining(String input);
    List<Books> findBooksByAuthorIsContaining(String input);
    List<Books> findBooksByAuthorContains(String input);
}
