package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.request.BooksRequest;
import com.daar.mylibrary.dto.request.ImageUploadReq;
import com.daar.mylibrary.dto.response.Books.BooksContentResponse;
import com.daar.mylibrary.dto.response.Books.BooksResponse;
import com.daar.mylibrary.dto.response.ElementRemovedResponse;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.FileNotSupportedException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.BooksService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping(path="/api/v1/books")
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
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            Page<Response> books = booksService.findAll(page, limit)
                    .map(BooksShortResponse::new);
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(books, watch.getTotalTimeMillis()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Book details")
    @ApiResponse(responseCode = "200", description = "Book found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/public/{id}")
    public ResponseEntity<Response> getBook(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BooksResponse(booksService.findById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[User] Book content")
    @ApiResponse(responseCode = "200", description = "Book found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksContentResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/protected/{id}/content")
    public ResponseEntity<Response> getBookContent(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BooksContentResponse(booksService.findBooksCont(id)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Add book", description = "Allows to add a book.\n ### Permissions needed to access resources : \n- create:books\n- create:authors\n- read:books\n- read:authors")
    @ApiResponse(responseCode = "201", description = "Book added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PostMapping(value = "/protected")
    public ResponseEntity<Response> addBook(@RequestBody BooksRequest book, @RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(new BooksShortResponse(booksService.addBook(book, file)));
        } catch (FileNotSupportedException e) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(new ErrorResponse(e.getMessage()));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Update book information", description = "Allows to update information of a book.\n ### Permissions needed to access resources : \n- read:books\n- update:books")
    @ApiResponse(responseCode = "200", description = "Book updated", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PatchMapping("/protected/{id}")
    public ResponseEntity<Response> updateBook(@PathVariable String id, @RequestBody BooksRequest book) {
        try {
            book.isEmpty();
            return ResponseEntity.status(HttpStatus.OK).body(new BooksShortResponse(booksService.updateBook(id, book)));
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Update book cover image", description = "Allows to update cover image of a book.\n ### Permissions needed to access resources : \n- read:books\n- update:books")
    @ApiResponse(responseCode = "200", description = "Book updated", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PutMapping(path = "/protected/{id}/image")
    public ResponseEntity<Response> updateCoverBook(@PathVariable String id, @RequestBody ImageUploadReq image) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BooksShortResponse(booksService.updateBookUrlCover(id, image.imageUrl)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Update book content", description = "Allows to update the content of a book.\n ### Permissions needed to access resources : \n- read:books\n- update:books")
    @ApiResponse(responseCode = "200", description = "Book's content updated", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = BooksShortResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PatchMapping(value = "/protected/{id}/content", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> updateBookContent(@PathVariable String id, @RequestParam(value = "file") @Parameter(schema = @Schema(type = "string", format = "binary")) MultipartFile file) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BooksShortResponse(booksService.updateBookContent(id, file)));
        } catch (BadRequestException | NullPointerException e) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(new ErrorResponse(e.getMessage()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (FileNotSupportedException e) {
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "[Admin] Remove book", description = "Allows to soft remove a book.\n ### Permissions needed to access resources : \n- read:books\n- delete:books\n- update:books")
    @ApiResponse(responseCode = "200", description = "Book removed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Book not found", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @DeleteMapping("/protected/{id}")
    public ResponseEntity<Response> removeBook(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new BooksShortResponse(booksService.removeBookById(id)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }
}
