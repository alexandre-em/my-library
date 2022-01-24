package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.BooksCont;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface BooksContentRepository extends ElasticsearchRepository<BooksCont, String> {
    Page<BooksCont> findBooksContentByContentMatchesRegex(String search, Pageable pageable);
    BooksCont findBooksContentById(String id);
    Page<BooksCont> findBooksContByContent(String keywords, Pageable pageable);
}
