package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BooksRepository extends CrudRepository<Books, Long> {
    Books findBooksByBookId(String id);
    List<Books> findAllByDeletedAtIsNull(Pageable pageable);
    List<Books> findBooksByContentInAndDeletedAtIsNull(List<String> booksContentIds);
    List<Books> findBooksByYearAndDeletedAtIsNull(int year, Pageable pageable);
    List<Books> findBooksByTitleContainsAndDeletedAtIsNull(String title, Pageable pageable);

    @Query(nativeQuery = true, value =
            "select book.* " +
            "from authors_books b, auth0_user u, books book " +
            "where b.books_id = book.id and u.user_id = ?1 and b.authors_id in " +
                    "(select a.authors_id " +
                    "from authors_books a, user_read_list rl " +
                    "where u.id = rl.user_id and a.books_id = rl.read_list_id) and b.books_id not in " +
                        "(select rl2.read_list_id from user_read_list rl2 where u.id = rl2.user_id)")
    List<Books> findBooksByAuthorNotIn(@Param("auth_id") String id);
}
