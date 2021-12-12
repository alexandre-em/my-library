package com.daar.mylibrary;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.repository.BooksRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;

@SpringBootTest(classes = MylibraryApplication.class)
public class MigrationTest {
    @Autowired
    private BooksRepository booksRepository;
    @Value("classpath:books.json")
    Resource resource;

    @Test
    void migrate() throws IOException, JSONException {
        final String booksString = new String(Files.readAllBytes(resource.getFile().toPath()));
        JSONArray books = new JSONArray(booksString);
        for (int i=0; i<1664; i++) {
            ObjectMapper mapper = new ObjectMapper();
            HashMap<String, Object> map;
            map = mapper.readValue(books.get(i).toString(), new TypeReference<HashMap<String, Object>>() {});
            String content = new String ( Files.readAllBytes( Paths.get((String) map.get("path")) ) );
            Books b = booksRepository.save(new Books((String) map.get("title"), (Integer) map.get("release_date"), (String) map.get("language"), content));
            System.out.println(i+" "+b);
        }
    }
}
