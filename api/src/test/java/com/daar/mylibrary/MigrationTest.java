package com.daar.mylibrary;

import com.daar.mylibrary.data.*;
import com.daar.mylibrary.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Iterator;
import java.util.stream.Collectors;

@SpringBootTest(classes = MylibraryApplication.class)
public class MigrationTest {
    @Autowired
    private BooksRepository booksRepository;
    @Autowired
    private AuthorsRepository authorsRepository;
    @Autowired
    private BooksContentRepository booksContentRepository;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private WordIndexRepository wordIndexRepository;
    @Value("classpath:books.json")
    Resource resource;
    @Value("classpath:all_words.json")
    Resource allWords;
    String API_URL = "http://localhost:8000/";

    @Test
    void test() throws IOException, JSONException {
        final String booksString = new String(Files.readAllBytes(allWords.getFile().toPath()));
        JSONArray words = new JSONArray(booksString);
        for (int i=0; i<words.length(); i++) {
            if (((String) words.get(i)).matches(".*\\d.*")) continue;
            wordRepository.save(new Word((String) words.get(i)));
        }
    }

    @Test
    void migrate() throws IOException, JSONException {
        final String booksString = new String(Files.readAllBytes(resource.getFile().toPath()));
        JSONArray books = new JSONArray(booksString);
        HttpURLConnection connection = null;
        for (int i=897; i<2001; i++) {
            ObjectMapper mapper = new ObjectMapper();
            HashMap<String, Object> map;
            map = mapper.readValue(books.get(i).toString(), new TypeReference<HashMap<String, Object>>() {});
            String content = String.join(" ", Files.readAllLines(Paths.get((String) map.get("path")), StandardCharsets.ISO_8859_1).stream().filter(val -> val.length() > 1).collect(Collectors.toList()));
            Authors author = authorsRepository.findAuthorsByName((String) map.get("author"));
            if (author == null) author = authorsRepository.save(new Authors((String) map.get("author"))); // The author is not yet added, so we add it to the db
            BooksCont bc = booksContentRepository.save(new BooksCont(content));
            Books b = booksRepository.save(new Books((String) map.get("title"), (Integer) map.get("release_date"), (String) map.get("language"), bc.getId(), author));
            String path = ((String) map.get("path"));
            connection = (HttpURLConnection) new URL(API_URL + "books/?books_path=" + path).openConnection();
            connection.setRequestMethod("GET");
            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
                //Read JSON response and print
                JSONObject myResponse = new JSONObject(response.toString());
                for (Iterator it = myResponse.keys(); it.hasNext(); ) {
                    String s = (String) it.next();
                    if (s.matches(".*\\d.*")) continue;
                    System.out.println(s);
                    Word word = wordRepository.findWordByWordEquals(s);
                    WordIndex wordIndex = wordIndexRepository.save(new WordIndex(b, word,(Integer) myResponse.get(s)));
                }
            }
            author.addBooks(b);
            authorsRepository.save(author);
            System.out.println(i+" "+b);
        }
    }
}
