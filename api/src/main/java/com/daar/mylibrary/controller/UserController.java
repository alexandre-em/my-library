package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.dto.response.ElementRemovedResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.Response;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.UsersService;
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
@RequestMapping(path = "/api/v1/user", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Users", description = "Auth0 users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UsersService usersService;

    @Operation(summary = "Get User suggestion", description = "Allows to get user's suggestion.\n ### Permissions needed to access resources : \n- read:users\n- \n- read:books")
    @ApiResponse(responseCode = "200", description = "Book removed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "401", description = "The authentication or authorization failed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "403", description = "You are not permitted to perform this action", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "422", description = "Your request is invalid", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @GetMapping("/{id}")
    public ResponseEntity<List<Response>> getUser(@PathVariable String id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(usersService.suggestionBooks(id).stream().map(BooksShortResponse::new).collect(Collectors.toList()));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @Operation(summary = "Add User into db", description = "Allows to add user to save readen books and suggest other.\n")
    @ApiResponse(responseCode = "200", description = "Book removed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @PostMapping("/{id}")
    public ResponseEntity<Response> addUser(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(usersService.addUser(id)));
    }
}
