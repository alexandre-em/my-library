package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BooksRepository extends CrudRepository<Books, Long> {
    Books findBooksById(Long id);
    @Query(nativeQuery = true, value = "SELECT content FROM books")
    List<String> findAllBooksContent();
    List<Books> findBooksByContentIn(List<String> booksContentIds);
    List<Books> findBooksByYear(int year, Pageable pageable);
    List<Books> findBooksByAuthorContains(String author);
    List<Books> findBooksByTitleContains(String title, Pageable pageable);
}
