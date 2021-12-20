package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.BooksCont;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface BooksContentRepository extends ElasticsearchRepository<BooksCont, String> {
    List<BooksCont> findBooksContentByContentMatchesRegex(String search, Pageable pageable);
    BooksCont findBooksContentById(String id);
    List<BooksCont> findBooksContByContent(String keywords, Pageable pageable);
}
