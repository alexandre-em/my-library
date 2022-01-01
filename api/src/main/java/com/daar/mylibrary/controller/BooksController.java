package com.daar.mylibrary.controller;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.dto.response.Books.BooksResponse;
import com.daar.mylibrary.dto.response.ElementRemovedResponse;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.service.BooksService;
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

    @Operation(summary = "Book list")
    @ApiResponse(responseCode = "200", description = "OK", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public/all")
    public ResponseEntity<Response> getBooks(@RequestParam(name = "current_page", defaultValue = "0") int page,
                                             @RequestParam(name = "limit", defaultValue = "20") int limit) {
        List<Response> books = booksService.findAll(page, limit).stream().map(BooksShortResponse::new).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(limit, page, books));
    }

    @Operation(summary = "Book details")
    @ApiResponse(responseCode = "200", description = "Book found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public/{id}")
    public ResponseEntity<Response> getBook(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(new BooksResponse(booksService.findById(id)));
    }


    @Operation(summary = "[Admin] Add book", description = "Allows to add a book.\n ### Permissions needed to access resources : \n- create:books\n- create:authors\n- read:books\n- read:authors")
    @ApiResponse(responseCode = "201", description = "Book added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PostMapping("/protected")
    public ResponseEntity<Response> addBook(@RequestBody Books book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new BooksShortResponse(booksService.addBook(book)));
    }


    @Operation(summary = "[Admin] Remove book", description = "Allows to soft remove a book.\n ### Permissions needed to access resources : \n- read:books\n- delete:books\n- update:books")
    @ApiResponse(responseCode = "200", description = "Book removed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @DeleteMapping("/protected/{id}")
    public ResponseEntity<Response> removeBook(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(new BooksShortResponse(booksService.removeBookById(id)));
    }
}
