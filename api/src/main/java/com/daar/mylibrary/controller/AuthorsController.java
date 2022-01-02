package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.response.Authors.AuthorsResponse;
import com.daar.mylibrary.dto.response.Authors.AuthorsShortResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.PaginationResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.BadRequestException;
import com.daar.mylibrary.exception.FileNotSupportedException;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.AuthorsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
        List<Response> books = authorsService.findAll(page, limit).stream().map(AuthorsShortResponse::new).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(new PaginationResponse(limit, page, books));
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
}
