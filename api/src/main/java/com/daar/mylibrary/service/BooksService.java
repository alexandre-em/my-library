package com.daar.mylibrary.service;

import com.daar.mylibrary.data.*;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.*;
import com.daar.mylibrary.utils.SearchType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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
                return booksRepository.findBooksByContentIn(
                        booksContentRepository.findBooksContByContent(search, PageRequest.of(page, limit)).stream().map(BooksCont::getId).collect(Collectors.toList()));
            case REGEX:
                System.out.println("Regex");
                List<BooksCont> list = booksContentRepository.findBooksContentByContentMatchesRegex(search, PageRequest.of(page, limit));
                System.out.println(list);
                List<String> ids = list.stream().map(BooksCont::getId).collect(Collectors.toList()) ;
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

    public Books addBook(Books book) {
        return booksRepository.save(book);
    }
}
