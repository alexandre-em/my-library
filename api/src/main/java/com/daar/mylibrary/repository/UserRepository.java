package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserIdAndDeletedAtIsNull(String uuid);
}
