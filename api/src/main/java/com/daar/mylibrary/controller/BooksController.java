package com.daar.mylibrary.controller;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.response.Books.BooksShortResponse;
import com.daar.mylibrary.response.ErrorResponse;
import com.daar.mylibrary.response.PaginationResponse;
import com.daar.mylibrary.response.Response;
import com.daar.mylibrary.service.BooksService;
import com.daar.mylibrary.utils.SearchType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path="/api/v1/books", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Books", description = "Gutenberg's english books")
@CrossOrigin(origins = "*")
public class BooksController {
    @Autowired
    private BooksService booksService;

    @Operation(summary = "Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by commas.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public")
    public ResponseEntity<Response> searchBookReg(@RequestParam String search,
                                                  @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                  @RequestParam(name = "match_all", defaultValue = "false", required = false) boolean matchAll,
                                                  @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                  @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        try {
            List<Response> books = booksService.searchBooks(search, type, matchAll, limit, page)
                    .stream()
                    .map(BooksShortResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(limit, page, books));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[User] Search a book by a word", description = "Search a book by keywords. Each keywords must be separated by commas.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity", scopes = "read:books")
    @GetMapping
    public ResponseEntity<Response> searchBookUser(@RequestParam String search,
                                                  @RequestParam(name = "type", defaultValue = "DEFAULT", required = false) SearchType type,
                                                  @RequestParam(name = "match_all", defaultValue = "false", required = false) boolean matchAll,
                                                  @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                  @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        try {
            List<Response> books = booksService.searchBooks(search, type, matchAll, limit, page)
                    .stream()
                    .map(BooksShortResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(limit, page, books));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[User] Search a book by an indexed word", description = "Search a book by keywords. Each keywords must be separated by commas.\n ### Permissions needed to access resources : \n- read:books\n- read:authors")
    @ApiResponse(responseCode = "200", description = "Books founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/index")
    public ResponseEntity<Response> searchBookIndex(@RequestParam String search,
                                                   @RequestParam(name = "limit", defaultValue = "20") int limit,
                                                   @RequestParam(name = "current_page", defaultValue = "0") int page
    ) {
        try {
            List<Response> books = booksService.searchBooksByIndex(search, page, limit)
                    .stream()
                    .map(BooksShortResponse::new)
                    .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(limit, page, books));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Add book to the library", description = "Allows to add a book to the library.\n ### Permissions needed to access resources : \n- create:books")
    @ApiResponse(responseCode = "201", description = "Book added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PostMapping("/protected")
    public ResponseEntity<Response> addBook(@RequestBody Books book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new BooksShortResponse(booksService.addBook(book)));
    }
}
