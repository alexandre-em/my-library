package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Word;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Set;

public interface WordRepository extends CrudRepository<Word, Long> {
    Word findWordByWordEquals(String word);
    Set<Word> findWordByWordContaining(String word);
}
