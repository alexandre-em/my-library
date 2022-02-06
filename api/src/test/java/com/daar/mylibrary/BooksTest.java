package com.daar.mylibrary;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.data.BooksCont;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.AuthorsRepository;
import com.daar.mylibrary.repository.BooksContentRepository;
import com.daar.mylibrary.repository.BooksRepository;
import com.daar.mylibrary.service.BooksService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = MylibraryApplication.class)
public class BooksTest {
    @Autowired
    BooksRepository booksRepository;
    @Autowired
    BooksContentRepository booksContentRepository;
    @Autowired
    AuthorsRepository authorsRepository;

    @Autowired
    BooksService booksService;

    private Authors authors;
    private Books book;
    private BooksCont booksCont;
    private String uuid;

    @BeforeEach
    public void before() {
        authors = authorsRepository.save(new Authors("Test Author"));
        booksCont = booksContentRepository.save(new BooksCont("Test content"));
        book = booksRepository.save(new Books("A title", 2022, "english", booksCont.getId(), authors));
    }

    @AfterEach
    public void after() {
        booksContentRepository.delete(booksCont);
        booksRepository.delete(book);
        authorsRepository.delete(authors);
    }

    @Test
    public void testFindBookById() {
        Books b = booksService.findById(book.getBookId());
        assertNotNull(b);
        assertEquals(b.getBookId(), book.getBookId());
        assertEquals(b.getTitle(), book.getTitle());
        b = booksService.findById("a-dummy-uuid");
        assertNull(b);
    }

    @Test
    public void testFindBooksCont() throws NotFoundException {
        BooksCont b = booksService.findBooksCont(book.getBookId());
        assertEquals(b.getId(), booksCont.getId());
        assertEquals(b.getContent(), booksCont.getContent());
    }

    @Test
    public void testFindBooksContFail() {
        try {
            BooksCont bc = booksService.findBooksCont("a-dummy-uuid");
            assertNotNull(bc, "Must not pass this");
        } catch(NotFoundException e) {
            assertEquals(e.getMessage(), "Book not found");
        }
    }

    @Test
    public void testRemoveBooksById() throws NotFoundException {
        Books b = booksService.removeBookById(book.getBookId());

        Books b2 = booksService.findById(b.getBookId());
        assertNotNull(b2, "It is a soft remove so it remains on the db");
        assertNotNull(b2.getDeletedAt());
    }

    // uploadBookContent

    // addBook

    // updateBookContent

    // updateBook

    // convertMultipartFile

    // updateBookCover
}
