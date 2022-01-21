package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.data.User;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.BooksRepository;
import com.daar.mylibrary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BooksRepository booksRepository;

    public User findUser(String id) {
        return userRepository.findByUserIdAndDeletedAtIsNull(id);
    }

    public List<Books> suggestionBooks(String id) throws NotFoundException {
        User user = findUser(id);
        if (user == null) throw new NotFoundException("user not found");
        return booksRepository.findBooksByAuthorNotIn(id);
    }

    public User addUser(String id) {
        return userRepository.save(new User(id));
    }

    public User addKeyword(String uuid, String keyword) throws NotFoundException {
        User user = findUser(uuid);
        if (user == null) throw new NotFoundException("user not found");
        user.addKeyword(keyword);
        return userRepository.save(user);
    }

    public User addBooksRead(String id, String bookId) throws NotFoundException {
        Books book = booksRepository.findBooksByBookId(bookId);
        User user = findUser(id);
        if (book == null || user == null) throw new NotFoundException("user or book not found");
        user.addToReadList(book);
        return userRepository.save(user);
    }

    public User deleteUser(String id) throws NotFoundException {
        User user = findUser(id);
        if (user == null) throw new NotFoundException("user not found");
        user.setDeletedAt(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }
}
