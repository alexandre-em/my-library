package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.WordIndex;
import com.daar.mylibrary.data.WordIndexId;
import org.springframework.data.repository.CrudRepository;

public interface WordIndexRepository extends CrudRepository<WordIndex, WordIndexId> {
}
