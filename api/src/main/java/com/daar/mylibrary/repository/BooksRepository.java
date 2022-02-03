package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BooksRepository extends CrudRepository<Books, Long> {
    Books findBooksByBookId(String id);
    Books findBooksByContent(String id);
    Page<Books> findBooksByBookIdInAndDeletedAtIsNull(List<String> ids, Pageable pageable);
    Page<Books> findAllByDeletedAtIsNull(Pageable pageable);
    Page<Books> findBooksByContentInAndDeletedAtIsNull(List<String> booksContentIds, Pageable pageable);
    Page<Books> findBooksByYearAndDeletedAtIsNull(int year, Pageable pageable);
    Page<Books> findBooksByTitleContainsAndDeletedAtIsNull(String title, Pageable pageable);
    @Query(nativeQuery = true,
            value = "select b.* from authors a, books b, authors_books ab where a.id = ab.authors_id and b.id = ab.books_id and a.name like %:name%",
            countQuery = "select b.* from authors a, books b, authors_books ab where a.id = ab.authors_id and b.id = ab.books_id and a.name like %:name%")
    Page<Books> findBooksByAuthors(@Param("name") String name, Pageable pageable);

    @Query(nativeQuery = true, value =
            "select book.* " +
            "from authors_books b, auth0_user u, books book " +
            "where b.books_id = book.id and u.user_id = ?1 and b.authors_id in " +
                    "(select a.authors_id " +
                    "from authors_books a, auth0_user_read_list rl " +
                    "where u.id = rl.user_id and a.books_id = rl.read_list_id) and b.books_id not in " +
                        "(select rl2.read_list_id from auth0_user_read_list rl2 where u.id = rl2.user_id)")
    List<Books> findBooksByAuthorNotIn(@Param("auth_id") String id, Pageable pageable);
}
