package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.request.AuthorName;
import com.daar.mylibrary.dto.request.BookListRequest;
import com.daar.mylibrary.dto.response.Authors.AuthorsResponse;
import com.daar.mylibrary.dto.response.Authors.AuthorsShortResponse;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.AuthorsService;
import io.swagger.v3.oas.annotations.Operation;
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

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/api/v1/authors", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Authors", description = "Gutenberg's authors")
@CrossOrigin(origins = "*")
public class AuthorsController {
    @Autowired
    private AuthorsService authorsService;


    @Operation(summary = "Authors list")
    @ApiResponse(responseCode = "200", description = "OK", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = PaginationResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public/all")
    public ResponseEntity<Response> getAuthors(@RequestParam(name = "current_page", defaultValue = "0") int page,
                                             @RequestParam(name = "limit", defaultValue = "20") int limit) {
        StopWatch watch = new StopWatch();
        watch.start();
        Page<Response> books = authorsService.findAll(page, limit)
                .map(AuthorsShortResponse::new);
        watch.stop();
        return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(books, watch.getTotalTimeMillis()));
    }

    @Operation(summary = "Author details")
    @ApiResponse(responseCode = "200", description = "OK", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = AuthorsResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Authors not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public/{id}")
    public ResponseEntity<Response> getBook(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new AuthorsResponse(authorsService.findById(id)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Add Author", description = "Allows to add an Author.\n ### Permissions needed to access resources : \n- create:books\n- create:authors\n- read:authors")
    @ApiResponse(responseCode = "201", description = "Authors added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PostMapping(value = "/protected")
    public ResponseEntity<Response> addBook(@RequestBody AuthorName author) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(new AuthorsShortResponse(authorsService.addAuthor(author.name)));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Update author name", description = "Allows to update author name.\n ### Permissions needed to access resources : \n- read:authors\n- update:authors")
    @ApiResponse(responseCode = "200", description = "Authors name updated", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = AuthorsShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PutMapping("/protected/{id}")
    public ResponseEntity<Response> updateAuthor(@PathVariable String id, @RequestBody AuthorName author) {
        try {
            if (author == null || author.name == null || author.name.isEmpty()) throw new BadRequestException("Empty value not allowed");
            return ResponseEntity.status(HttpStatus.OK).body(new AuthorsShortResponse(authorsService.updateName(id, author.name)));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Add a book", description = "Allows to update the author book list.\n ### Permissions needed to access resources : \n- read:books\n- update:authors")
    @ApiResponse(responseCode = "200", description = "Author's books list updated", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = AuthorsShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PatchMapping(value = "/protected/{id}/books")
    public ResponseEntity<Response> updateAuthorBookList(@PathVariable String id, @RequestBody BookListRequest bookIds) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new AuthorsShortResponse(authorsService.addBooks(id, bookIds) ));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        }
    }
}
