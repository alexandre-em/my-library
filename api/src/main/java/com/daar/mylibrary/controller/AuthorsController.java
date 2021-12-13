package com.daar.mylibrary.controller;

import com.daar.mylibrary.response.AuthorsResponse;
import com.daar.mylibrary.response.ErrorResponse;
import com.daar.mylibrary.response.Response;
import com.daar.mylibrary.service.AuthorsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/authors")
@Tag(name="Authors", description = "Gutenberg's authors")
public class AuthorsController {
    @Autowired
    private AuthorsService authorsService;

    @Operation(summary = "Basic search author of the Gutenberg library")
    @ApiResponse(responseCode = "200", description = "Author founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = AuthorsResponse.class)) })
    @ApiResponse(responseCode = "404", description = "Author not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping
    public ResponseEntity<List<Response>> search(@RequestParam("search") String input) {
        List<Response> response = authorsService.searchAuthors(input)
                .stream().map(AuthorsResponse::new).collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
