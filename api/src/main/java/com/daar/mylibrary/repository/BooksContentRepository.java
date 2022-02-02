package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.BooksCont;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface BooksContentRepository extends ElasticsearchRepository<BooksCont, String> {
    Page<BooksCont> findBooksContentByContentMatchesRegex(String search, Pageable pageable);
    Page<BooksCont> findBooksContByContent(String keywords, Pageable pageable);
    Page<BooksCont> findBooksContByContent(List<String> keywords, Pageable pageable);
}
