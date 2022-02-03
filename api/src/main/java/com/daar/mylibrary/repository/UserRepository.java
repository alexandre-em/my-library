package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.data.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserIdAndDeletedAtIsNull(String uuid);

    @Query("select u.readList from User u where u.userId = ?1")
    Page<Books> findUserReadBooks(String userId, Pageable pageable);
}
