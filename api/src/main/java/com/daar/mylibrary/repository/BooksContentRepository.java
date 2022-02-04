package com.daar.mylibrary.repository;

import com.daar.mylibrary.data.BooksCont;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BooksContentRepository extends ElasticsearchRepository<BooksCont, String> {
    Page<BooksCont> findBooksContentByContentMatchesRegex(String search, Pageable pageable);
    Page<BooksCont> findBooksContByContent(String keywords, Pageable pageable);
    Page<BooksCont> findBooksContByContent(List<String> keywords, Pageable pageable);
    @Query("{\n" +
            "  \"function_score\" : {\n" +
            "    \"query\": { \"match\": {\n" +
            "       \"content\": \"?0\"\n" +
            "    } },\n" +
            "    \"score_mode\" : \"sum\",\n" +
            "    \"functions\" : [\n" +
            "      { \"filter\": {\n" +
            "        \"bool\": {\n" +
            "          \"must_not\" : {\n" +
            "            \"ids\": { \"values\": ?1 }\n" +
            "          }\n" +
            "        }\n" +
            "      },\n" +
            "      \"weight\": 8  \n" +
            "      },\n" +
            "{\n" +
            "        \"filter\": {\n" +
            "            \"bool\": { \"must\": [" +
            "               {\"match\": { \"content\": \":a0\" }}," +
            "               {\"match\": { \"content\": \":a1\" }}," +
            "               {\"match\": { \"content\": \":a2\" }}" +
            "            ] }\n" +
            "        },\n" +
            "        \"weight\": 4\n" +
            "      }" +
            "]\n" +
            "  }\n" +
            "}\n")
    Page<BooksCont> findBooksContByContentNotIn(String search, List<String> readIds, @Param("a0") String authors, @Param("a1") String authors1, @Param("a2") String authors2, Pageable pageable);
}
