package com.daar.mylibrary.service;

import com.daar.mylibrary.data.*;
import com.daar.mylibrary.dto.request.BooksRequest;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.FileNotSupportedException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.*;
import com.daar.mylibrary.utils.SearchType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static java.lang.Integer.parseInt;

@Service
public class BooksService {
    @Autowired
    private BooksRepository booksRepository;
    @Autowired
    private BooksContentRepository booksContentRepository;
    @Autowired
    private AuthorsRepository authorsRepository;
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private WordIndexRepository wordIndexRepository;

    public List<Books> searchBooksByIndex(String word, int page, int limit) throws BadRequestException, NotFoundException {
        if (word.matches(".*\\d.*")) throw new BadRequestException("Your word contains a numeric value");
        Word w = wordRepository.findWordByWordEquals(word);
        if (w == null) throw new NotFoundException("There is no book containing a word matching yours");
        return wordIndexRepository.findWordIndexByIdWordContaining(w, PageRequest.of(page, limit)).stream().map(WordIndex::getBook).collect(Collectors.toList());
    }

    public List<Books> searchBooks(String search, SearchType type, boolean matchAll, int limit, int page) throws BadRequestException {
        switch(type) {
            case DEFAULT:
                return booksRepository.findBooksByContentInAndDeletedAtIsNull(
                        booksContentRepository.findBooksContByContent(search, PageRequest.of(page, limit)).stream().map(BooksCont::getId).collect(Collectors.toList()));
            case REGEX:
                System.out.println("Regex");
                List<BooksCont> list = booksContentRepository.findBooksContentByContentMatchesRegex(search, PageRequest.of(page, limit));
                System.out.println(list);
                List<String> ids = list.stream().map(BooksCont::getId).collect(Collectors.toList()) ;
                return booksRepository.findBooksByContentInAndDeletedAtIsNull(ids);
            case YEAR:
                int year;
                try {
                    year = parseInt(search);
                } catch (NumberFormatException e) {
                    throw new BadRequestException("The `YEAR` enumeration input must be a numeric value");
                }
                return booksRepository.findBooksByYearAndDeletedAtIsNull(year, PageRequest.of(page, limit));
            case TITLE:
                return booksRepository.findBooksByTitleContainsAndDeletedAtIsNull(search, PageRequest.of(page, limit));
            case AUTHOR:
                return authorsRepository.findAuthorsByNameContains(search, PageRequest.of(page, limit))
                        .stream()
                        .map(Authors::getBooks)
                        .flatMap(List::stream)
                        .collect(Collectors.toList());
            default:
                throw new BadRequestException("`Type` must be a value of the `SearchType` enumeration");
        }
    }

    public List<Books> findAll(int page, int limit) { return booksRepository.findAllByDeletedAtIsNull(PageRequest.of(page, limit)); }
    public Books findById(String uuid) { return booksRepository.findBooksByBookId(uuid); }
    public List<Books> findBooksContentById(List<String> ids) {
        return booksRepository.findBooksByContentInAndDeletedAtIsNull(ids);
    }

    public Books removeBookById(String uuid) {
        Books books = booksRepository.findBooksByBookId(uuid);
        books.setDeletedAt(new Timestamp(System.currentTimeMillis()));
        return booksRepository.save(books);
    }

    public Books addBook(Books book) {
        // TODO: Implement the method
        return booksRepository.save(book);
    }

    public Books updateBookContent(String uuid, MultipartFile file) throws FileNotSupportedException, NotFoundException, BadRequestException {
        if (file.isEmpty()) throw  new BadRequestException("Please select a valid text file");
        String[] fn = file.getOriginalFilename().split("\\.");
        if (fn.length < 2) throw new FileNotSupportedException("File without extension not supported");
        String ext = fn[fn.length - 1]; // extracting file's extension
        if (!ext.toLowerCase().equals("txt")) throw new FileNotSupportedException("File with ."+ext+" extension not supported");
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("Book with the following id not founded: " + uuid);
        // TODO: continue by parsing the text file and save into elasticsearch
        try  {
            String content = new String(file.getBytes(), StandardCharsets.ISO_8859_1);
            booksContentRepository.deleteById(book.getContent());
            book.setContent(booksContentRepository.save(new BooksCont(content)).getId());
            return booksRepository.save(book);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new BadRequestException("An error occurred while processing the text file");
        }
    }

    public Books updateBook(String uuid, BooksRequest booksRequest) throws NotFoundException {
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("There is no such book");
        if (booksRequest.authors != null) {
            Authors exist = authorsRepository.findAuthorsByName(booksRequest.authors);
            book.getAuthor().removeBook(book);
            if (exist != null) {
                exist.addBooks(book);
                book.setAuthor(authorsRepository.save(exist));
            } else {
                Authors newAuthors = new Authors(booksRequest.authors);
                newAuthors.addBooks(book);
                book.setAuthor(authorsRepository.save(newAuthors));
            }
        }
        if (booksRequest.title != null) book.setTitle(booksRequest.title);
        if (booksRequest.language != null) book.setLanguage(booksRequest.language);
        if (booksRequest.year != 0) book.setYear(booksRequest.year);
        return booksRepository.save(book);
    }
}
