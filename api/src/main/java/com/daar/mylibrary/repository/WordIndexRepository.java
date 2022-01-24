package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Word;
import com.daar.mylibrary.data.WordIndex;
import com.daar.mylibrary.data.WordIndexId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface WordIndexRepository extends CrudRepository<WordIndex, WordIndexId> {
    @Query("SELECT wi FROM WordIndex wi WHERE wi.id.word = ?1 ORDER BY wi.occurrence DESC")
    Page<WordIndex> findWordIndexByIdWordContaining(Word word, Pageable pageable);
}
