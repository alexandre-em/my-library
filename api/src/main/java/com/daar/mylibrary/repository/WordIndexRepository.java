package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.BookScoring;
import com.daar.mylibrary.data.Word;
import com.daar.mylibrary.data.WordIndex;
import com.daar.mylibrary.data.WordIndexId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WordIndexRepository extends CrudRepository<WordIndex, WordIndexId> {
    @Query("SELECT wi FROM WordIndex wi WHERE wi.id.word = ?1 ORDER BY wi.occurrence DESC")
    Page<WordIndex> findWordIndexByIdWordContaining(Word word, Pageable pageable);
    @Query("select new com.daar.mylibrary.data.BookScoring(wi.id.book, sum(wi.occurrence)) from WordIndex wi where wi.id.word in :words group by wi.id.book order by sum(wi.occurrence) desc")
    Page<BookScoring> findWordIndexByIdListWordContaining(@Param("words") List<Word> words, Pageable pageable);
}
