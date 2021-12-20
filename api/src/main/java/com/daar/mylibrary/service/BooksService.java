package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.data.BooksCont;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.repository.AuthorsRepository;
import com.daar.mylibrary.repository.BooksContentRepository;
import com.daar.mylibrary.repository.BooksRepository;
import com.daar.mylibrary.utils.SearchType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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

    public List<Books> searchBooks(String search, SearchType type, boolean matchAll, int limit, int page) throws BadRequestException {
        switch(type) {
            case DEFAULT:
                return booksRepository.findBooksByContentIn(
                        booksContentRepository.findBooksContByContent(search, PageRequest.of(page, limit)).stream().map(BooksCont::getId).collect(Collectors.toList()));
            case REGEX:
                System.out.println("Regex");
                List<String> ids = booksContentRepository.findBooksContentByContentMatchesRegex(search, PageRequest.of(page, limit)).stream().map(BooksCont::getId).collect(Collectors.toList()) ;
                return booksRepository.findBooksByContentIn(ids);
            case YEAR:
                int year;
                try {
                    year = parseInt(search);
                } catch (NumberFormatException e) {
                    throw new BadRequestException("The `YEAR` enumeration input must be a numeric value");
                }
                return booksRepository.findBooksByYear(year, PageRequest.of(page, limit));
            case TITLE:
                return booksRepository.findBooksByTitleContains(search, PageRequest.of(page, limit));
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

    public List<Books> findBooksContentById(List<String> ids) {
        return booksRepository.findBooksByContentIn(ids);
    }

    public List<BooksCont> searchRegexSql(String search) {
        List<String> searchList = new ArrayList<>();
        searchList.add(search);
        return booksContentRepository.findBooksContentByContentMatchesRegex(search, PageRequest.of(1, 20));
    }

    public Books addBook(Books book) {
        return booksRepository.save(book);
    }
}
