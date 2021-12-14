package com.daar.mylibrary.controller;

import com.daar.mylibrary.data.Books;
import com.daar.mylibrary.response.Books.BooksResponse;
import com.daar.mylibrary.response.Books.BooksShortResponse;
import com.daar.mylibrary.response.ErrorResponse;
import com.daar.mylibrary.response.Response;
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

@Controller
@RequestMapping(path="/api/v1/books", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Books", description = "Gutenberg's english books")
@CrossOrigin(origins = "*")
public class BooksController {
    @Autowired
    private BooksService booksService;

    @Operation(summary = "[Protected] Add book to the library", description = "Allows to add a book to the library.\n ### Permissions needed to access resources : \n- update:books")
    @ApiResponse(responseCode = "201", description = "Book added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PostMapping
    public ResponseEntity<Response> addBook(@RequestBody Books book) {
        return ResponseEntity.status(HttpStatus.CREATED).body(new BooksResponse(booksService.addBook(book)));
    }
}
