package com.daar.mylibrary.service;

import com.daar.mylibrary.data.*;
import com.daar.mylibrary.dto.request.BooksRequest;
import com.daar.mylibrary.dto.request.IndexSearchType;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.FileNotSupportedException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.*;
import com.daar.mylibrary.dto.request.SearchType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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
    @Autowired
    private UserRepository userRepository;

    public Page<BookScoring> searchBooksByIndex(String word, IndexSearchType type, int page, int limit) throws BadRequestException, NotFoundException {
        if (word.matches(".*\\d.*")) throw new BadRequestException("Your word contains a numeric value");
        List<Word> w;
        if (type == IndexSearchType.DEFAULT) {
            w = Arrays.stream(word.split(","))
                    .flatMap(wd -> wordRepository.findWordByWordContaining(wd).stream())
                    .distinct()
                    .collect(Collectors.toList());
        } else {
            w = wordRepository.findWordsByWordRegex(word);
        }
        if (w.isEmpty()) throw new NotFoundException("There is no book containing a word matching yours");

        return wordIndexRepository.findWordIndexByIdListWordContaining(w, PageRequest.of(page, limit));
    }

    public Page<Books> searchBooks(String search, SearchType type, int limit, int page, String userId) throws BadRequestException, NotFoundException {
        switch(type) {
            case DEFAULT:
                if (userId != null) {
                    User user = userRepository.findByUserIdAndDeletedAtIsNull(userId);
                    if (user == null) throw new NotFoundException("User not found");
                    List<String> authors = user
                            .getReadList()
                            .stream()
                            .map(Books::getAuthorsName)
                            .distinct()
                            .collect(Collectors.toList());
                    // TODO: Improve this trash code
                    String[] params = {"N/A", "N/A", "N/A"};
                    if (authors.size() > 0) params[0] = authors.get(0);
                    if (authors.size() > 1) params[1] = authors.get(1);
                    if (authors.size() > 2) params[2] = authors.get(2);

                    return booksContentRepository.findBooksContByContentNotIn(search, user.getReadList().stream().map(Books::getContent).collect(Collectors.toList()), params[0], params[1], params[2], PageRequest.of(page, limit))
                            .map(booksCont -> booksRepository.findBooksByContent(booksCont.getId()));
                } else {
                    return booksContentRepository.findBooksContByContent(search, PageRequest.of(page, limit))
                            .map(booksCont -> booksRepository.findBooksByContent(booksCont.getId()));
                }
            case REGEX:
                return booksContentRepository.findBooksContentByContentMatchesRegex(search, PageRequest.of(page, limit))
                        .map(booksCont -> booksRepository.findBooksByContent(booksCont.getId()));
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
                return booksRepository.findBooksByAuthors(search, PageRequest.of(page, limit));
            default:
                throw new BadRequestException("`Type` must be a value of the `SearchType` enumeration");
        }
    }

    public BooksCont findBooksCont(String uuid) throws NotFoundException {
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("Book not found");
        System.out.println(book.getContent());
        Optional<BooksCont> cont = booksContentRepository.findById(book.getContent());
        if (!cont.isPresent()) throw  new NotFoundException("Error Content not found");

        return cont.get();
    }

    public Page<Books> findAll(int page, int limit) { return booksRepository.findAllByDeletedAtIsNull(PageRequest.of(page, limit)); }
    public Books findById(String uuid) { return booksRepository.findBooksByBookId(uuid); }

    public Books removeBookById(String uuid) {
        Books books = booksRepository.findBooksByBookId(uuid);
        books.setDeletedAt(new Timestamp(System.currentTimeMillis()));

        return booksRepository.save(books);
    }

    public BooksCont uploadBookContent(MultipartFile file) throws BadRequestException, FileNotSupportedException, IOException {
        if (file.isEmpty()) throw  new BadRequestException("Please select a valid text file");
        String[] fn = file.getOriginalFilename().split("\\.");
        if (fn.length < 2) throw new FileNotSupportedException("File without extension not supported");
        String ext = fn[fn.length - 1]; // extracting file's extension
        if (!ext.toLowerCase().equals("txt")) throw new FileNotSupportedException("File with ."+ext+" extension not supported");
        String content = new String(file.getBytes(), StandardCharsets.ISO_8859_1);

        return booksContentRepository.save(new BooksCont(content));
    }

    public Books addBook(BooksRequest bookReq, MultipartFile file) throws FileNotSupportedException, BadRequestException {
        Authors author = authorsRepository.findAuthorsByName(bookReq.authors);
        if (author == null) authorsRepository.save(new Authors(bookReq.authors));
        try {
            BooksCont content = uploadBookContent(file);
            Books book = new Books(bookReq.title, bookReq.year, bookReq.language, content.getId(), author);

            return booksRepository.save(book);
        } catch (IOException e) {
            throw new BadRequestException("An error occurred while processing the text file");
        }
    }

    public Books updateBookContent(String uuid, MultipartFile file) throws FileNotSupportedException, NotFoundException, BadRequestException {
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("Book with the following id not founded: " + uuid);
        try  {
            BooksCont content = uploadBookContent(file);
            booksContentRepository.deleteById(book.getContent());
            book.setContent(content.getId());

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


    /**
     * Convert a `MultipartFile` to a `File` by saving it into the static directory with a unique name
     * @param file a binary file
     * @return a `File` object
     * @throws IOException
     * @see File
     */
    protected static File convertMultipartFile(MultipartFile file) throws IOException {
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new Date());
        String filename = timeStamp+"_"+file.getOriginalFilename(); // Generate a unique name for the file
        String newPath = "./static/"+filename;
        File tmp = new File(newPath);
        tmp.createNewFile(); // Saving the file into the static directory to be accessible by typing the correct path
        OutputStream os = new FileOutputStream(tmp);
        os.write(file.getBytes());

        return tmp;
    }

    public Books updateBookUrlCover(String uuid, String image) throws NotFoundException {
        // Check if book exists
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("Book with the following id not founded: " + uuid);

        book.setImage(image);

        return booksRepository.save(book);
    }

    public Books updateBookCover(String uuid, MultipartFile image) throws BadRequestException, NotFoundException, FileNotSupportedException {
        // Check if book exists
        Books book = booksRepository.findBooksByBookId(uuid);
        if (book == null) throw new NotFoundException("Book with the following id not founded: " + uuid);

        // Check file extension
        String[] fn = image.getOriginalFilename().split("\\.");
        if (fn.length < 2) throw new FileNotSupportedException("File without extension not supported");
        String ext = fn[fn.length - 1]; // extracting file's extension

        List<String> supportedFormat = Arrays.asList("jpg", "png");
        if (!supportedFormat.contains(ext.toLowerCase())) throw new FileNotSupportedException("File with ."+ext+" extension not supported");

        try  {
            File imageFile = convertMultipartFile(image);
            final String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString(); // get base url of the api
            book.setImage(baseUrl + "/static/" + imageFile.getName());

            return booksRepository.save(book);
        } catch (IOException e) {
            System.out.println(e.getMessage());
            throw new BadRequestException("An error occurred while processing the image file");
        }
    }
}
