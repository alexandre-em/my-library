package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BooksRepository extends CrudRepository<Books, Long> {
    Books findBooksByBookId(String id);
    List<Books> findAllByDeletedAtIsNull(Pageable pageable);
    List<Books> findBooksByContentInAndDeletedAtIsNull(List<String> booksContentIds);
    List<Books> findBooksByYearAndDeletedAtIsNull(int year, Pageable pageable);
    List<Books> findBooksByTitleContainsAndDeletedAtIsNull(String title, Pageable pageable);
}
