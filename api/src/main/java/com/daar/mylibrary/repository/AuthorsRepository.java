package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Authors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface AuthorsRepository extends CrudRepository<Authors, Long> {
   Authors findAuthorsByName(String name);
   Page<Authors> findAll(Pageable pageable);
   Authors findAuthorsByAuthorId(String id);
   Page<Authors> findAuthorsByNameContains(String keyword, Pageable pageable);
}
