package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.request.IndexSearchType;
import com.daar.mylibrary.dto.request.UserToken;
import com.daar.mylibrary.dto.response.Authors.AuthorsResponse;
import com.daar.mylibrary.dto.response.Books.BookScoringResponse;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ElementRemovedResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.AuthorsService;
import com.daar.mylibrary.service.BooksService;
import com.daar.mylibrary.service.UsersService;
import com.daar.mylibrary.utils.Constants;
import com.daar.mylibrary.dto.request.SearchType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@Controller
@RequestMapping(path="/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Search", description = "Search endpoints")
@CrossOrigin(origins = "*")
public class SearchController {
    @Autowired
    private BooksService booksService;
    @Autowired
    private AuthorsService authorsService;
    @Autowired
    private UsersService usersService;

    @GetMapping("/healthcheck")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok().body("The application is healthy");
    }

    @Operation(summary = "[User] Basic search of authors of the Gutenberg library", description = "Search books from `keyword` by passing the param `search`. \nYou can also filter the search by `type`, select an `algorithm` and paginate the results.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Author founded", content = { @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PaginationResponse.class))) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Author not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/authors")
    public ResponseEntity<Response> searchAuthor(@RequestParam("search") String input,
                                                 @RequestParam(name = "current_page", defaultValue = "0") int page,
                                                 @RequestParam(name = "limit", defaultValue = "20") int limit) {
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> response = authorsService.searchAuthors(input, page, limit)
                    .map(AuthorsResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(response, watch.getTotalTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by a comma.")
    @ApiResponse(responseCode = "200", description = "Books found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/books/public")
    public ResponseEntity<Response> searchBookPublic(@RequestParam String search,
                                                  @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                  @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                  @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> res = booksService.searchBooks(search, type, limit, page, null)
                    .map(BooksShortResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(res, watch.getTotalTimeMillis()));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[User] Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by a comma.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity", scopes = "read:books")
    @GetMapping("/books")
    public ResponseEntity<Response> searchBookUser(@RequestParam String search,
                                                   @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                   @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                   @RequestParam(name = "current_page", defaultValue = "0") int page,
                                                   @RequestHeader(name= "Authorization", required = false) String token
    ) {
        // Decoding authorization token
        UserToken userToken = Constants.decodeToken(token);
        // Separate each keyword by a comma
        String[] s = search.split(",");

        try {
            usersService.addKeyword(userToken.sub, Arrays.asList(s));
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> res = booksService.searchBooks(search, type, limit, page, userToken.sub)
                    .map(BooksShortResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(res, watch.getTotalTimeMillis()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("not found"));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[User] Search a book by an indexed word", description = "Search a book by keywords. Each keywords must be separated by commas.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/books/index")
    public ResponseEntity<Response> searchBookIndex(@RequestParam String search,
                                                    @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                    @RequestParam(name = "current_page", defaultValue = "0") int page,
                                                    @RequestParam(name = "type", defaultValue = "DEFAULT") IndexSearchType type,
                                                    @RequestHeader(name= "Authorization", required = false) String token
    ) {
        UserToken userToken = Constants.decodeToken(token);
        String[] s = search.split(",");
        try {
            usersService.addKeyword(userToken.sub, Arrays.asList(s));
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> books = booksService.searchBooksByIndex(search, type, page, limit)
                    .map(BookScoringResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(books, watch.getTotalTimeMillis()));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }
}
