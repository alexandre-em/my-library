package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Authors;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuthorsRepository extends CrudRepository<Authors, Long> {
   Authors findAuthorsByName(String name);
   List<Authors> findAuthorsByNameContaining(String keyword);
   List<Authors> findAuthorsByNameContains(String keyword);
   List<Authors> findAuthorsByNameIsContaining(String keyword);
}
