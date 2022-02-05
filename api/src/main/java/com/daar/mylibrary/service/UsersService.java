package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.data.BooksCont;
import com.daar.mylibrary.data.User;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.BooksContentRepository;
import com.daar.mylibrary.repository.BooksRepository;
import com.daar.mylibrary.repository.UserRepository;
import com.daar.mylibrary.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@Service
public class UsersService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BooksRepository booksRepository;
    @Autowired
    BooksContentRepository booksContentRepository;

    public User findUser(String id) {
        return userRepository.findByUserIdAndDeletedAtIsNull(id);
    }

    /**
     * Get the suggestion list of a user based on read books and previous searches
     * @param id    user id
     * @return a list of suggested books
     * @see Books
     * @throws NotFoundException User with this id does not exist
     */
    public List<Books> suggestionBooks(String id) throws NotFoundException {
        User user = findUser(id);
        if (user == null) throw new NotFoundException("user not found");
        List<Books> authorB = booksRepository.findBooksByAuthorNotIn(id, PageRequest.of(0, Constants.suggestionMax));
        if (authorB.size() > Constants.suggestionMax) return authorB;
        List<String> keywords = Arrays.asList(user.getKeywords().split(","));
        int n = Constants.suggestionMax - authorB.size();
        if (n <= 0) return authorB;
        List<Books> history = booksRepository.findBooksByContentInAndDeletedAtIsNull(booksContentRepository
                .findBooksContByContent(keywords, PageRequest.of(0, n))
                .map(BooksCont::getId).getContent(), PageRequest.of(0, n))
                .getContent();
        authorB.addAll(history);

        return authorB;
    }

    /**
     * Get all user's previously read books
     * @param id    user id
     * @param page  current page
     * @param limit max number of books on a page
     * @return a list of read books
     * @see Books
     * @throws NotFoundException the user does not exist
     */
    public List<Books> getReadBooks(String id, int page, int limit) throws NotFoundException {
        User user = findUser(id);
        if (user == null) throw new NotFoundException("user not found");
        return userRepository.findUserReadBooks(id, PageRequest.of(page, limit));
    }

    /**
     * Add a user on the db
     * @param id    user id
     * @see User
     * @return added user
     */
    public User addUser(String id) {
        User user = findUser(id);
        if (user != null) return user;
        return userRepository.save(new User(id));
    }

    /**
     * Add keywords to user's history search
     * @param uuid      user id
     * @param keywords  search keywords
     * @return updated user
     * @see User
     * @throws NotFoundException user is not on the db
     */
    public User addKeyword(String uuid, List<String> keywords) throws NotFoundException {
        User user = findUser(uuid);
        if (user == null) throw new NotFoundException("user not found");
        for (String keyword : keywords) {
            if (user.getKeywords() != null) {
                List<String> userKeywords = Arrays.asList(user.getKeywords().split(","));
                if (!userKeywords.contains(keyword))
                    user.addKeyword(keyword);
            } else
                user.addKeyword(keyword);
        }
        return userRepository.save(user);
    }

    /**
     * Add books to user's read books list
     * @param id        user id
     * @param bookId    books id
     * @return updated user
     * @see User
     * @throws NotFoundException user or book is not on the db
     */
    public User addBooksRead(String id, String bookId) throws NotFoundException {
        Books book = booksRepository.findBooksByBookId(bookId);
        User user = findUser(id);
        if (book == null || user == null) throw new NotFoundException("user or book not found");
        if (!user.getReadList().contains(book))
            user.addToReadList(book);
        return userRepository.save(user);
    }

    /**
     * Soft delete a user
     * @param id    user id
     * @return the removed user
     * @throws NotFoundException user already removed or not present on the db
     */
    public User deleteUser(String id) throws NotFoundException {
        User user = findUser(id);
        if (user == null) throw new NotFoundException("user not found");
        user.setDeletedAt(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }
}
