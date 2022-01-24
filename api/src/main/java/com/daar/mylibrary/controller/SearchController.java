package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.response.Authors.AuthorsResponse;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.AuthorsService;
import com.daar.mylibrary.service.BooksService;
import com.daar.mylibrary.utils.SearchType;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(path="/api/v1", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Search", description = "Search endpoints")
@CrossOrigin(origins = "*")
public class SearchController {
    @Autowired
    private BooksService booksService;
    @Autowired
    private AuthorsService authorsService;

    @Operation(summary = "[User] Basic search of authors of the Gutenberg library", description = "Search books from `keyword` by passing the param `search`. \nYou can also filter the search by `type`, select an `algorithm` and paginate the results.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Author founded", content = { @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = PaginationResponse.class))) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Author not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/authors")
    public ResponseEntity<Response> search(@RequestParam("search") String input,
                                                 @RequestParam(name = "current_page", defaultValue = "0") int page,
                                                 @RequestParam(name = "limit", defaultValue = "20") int limit) {
        StopWatch watch = new StopWatch();
        watch.start();
        Page<Response> response = authorsService.searchAuthors(input, page, limit)
                .map(AuthorsResponse::new);
        watch.stop();
        return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(response, watch.getTotalTimeMillis()));
    }

    private ResponseEntity<Response> search(String search, SearchType type, boolean matchAll, int limit, int page) {
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> res = booksService.searchBooks(search, type, matchAll, limit, page)
                    .map(BooksShortResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(res, watch.getTotalTimeMillis()));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by commas.")
    @ApiResponse(responseCode = "200", description = "Books found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/books/public")
    public ResponseEntity<Response> searchBookReg(@RequestParam String search,
                                                  @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                  @RequestParam(name = "match_all", defaultValue = "false", required = false) boolean matchAll,
                                                  @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                  @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        return search(search, type, matchAll, limit, page);
    }

    @Operation(summary = "[User] Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by commas.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity", scopes = "read:books")
    @GetMapping("/books")
    public ResponseEntity<Response> searchBookUser(@RequestParam String search,
                                                   @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                   @RequestParam(name = "match_all", defaultValue = "false", required = false) boolean matchAll,
                                                   @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                   @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        return search(search, type, matchAll, limit, page);
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
                                                    @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> books = booksService.searchBooksByIndex(search, page, limit)
                    .map(BooksShortResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(books, watch.getTotalTimeMillis()));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }
}
