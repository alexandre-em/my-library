package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.dto.request.BookListRequest;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.AuthorsRepository;
import com.daar.mylibrary.repository.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorsService {
    @Autowired
    private AuthorsRepository authorsRepository;
    @Autowired
    private BooksRepository booksRepository;

    public List<Authors> searchAuthors(String input, int current, int limit) {
        return authorsRepository.findAuthorsByNameContains(input, PageRequest.of(current, limit));
    }
    public List<Authors> findAll(int page, int limit) {
        return authorsRepository.findAll(PageRequest.of(page, limit));
    }
    public Authors findById(String uuid) throws NotFoundException {
        Authors author = authorsRepository.findAuthorsByAuthorId(uuid);
        if (author == null) throw new NotFoundException("Author not found");
        return author;
    }
    public Authors addAuthor(String name) throws BadRequestException {
        Authors authors = authorsRepository.findAuthorsByName(name);
        if (authors != null) throw new BadRequestException("Author already exist");
        return authorsRepository.save(new Authors(name));
    }

    public Authors updateName(String uuid, String name) throws NotFoundException {
        Authors authors = authorsRepository.findAuthorsByAuthorId(uuid);
        if (authors == null) throw new NotFoundException("Author not found");
        authors.setName(name);
        return authorsRepository.save(authors);
    }

    public Authors addBooks(String uuid, BookListRequest bookList) throws NotFoundException {
        Authors author = authorsRepository.findAuthorsByAuthorId(uuid);
        if (author == null) throw new NotFoundException("Author not found");
        List<String> authorsBooks = author.getBooks().stream().map(Books::getBookId).collect(Collectors.toList());
        List<Books> books = bookList
                .getBookIds()
                .stream()
                .filter(bookId -> !authorsBooks.contains(bookId) && booksRepository.findBooksByBookId(bookId) != null)
                .map(bookId -> booksRepository.findBooksByBookId(bookId))
                .collect(Collectors.toList());
        author.addAllBooks(books);
        authorsRepository.save(author);
        return author;
    }
}
