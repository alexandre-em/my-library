package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.Word;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface WordRepository extends CrudRepository<Word, Long> {
    Word findWordByWordEquals(String word);
    Set<Word> findWordByWordContaining(String word);
    @Query(nativeQuery = true, value = "select w.* from word w where w.word regexp :pattern")
    List<Word> findWordsByWordRegex(@Param("pattern") String pattern);
}
