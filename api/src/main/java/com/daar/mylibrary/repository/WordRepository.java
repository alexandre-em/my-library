package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Word;
import org.springframework.data.repository.CrudRepository;

public interface WordRepository extends CrudRepository<Word, Long> {
    Word findWordByWordEquals(String word);
}
