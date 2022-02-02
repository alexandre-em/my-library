package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.response.*;
import com.daar.mylibrary.dto.response.Books.BooksShortResponse;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.service.UsersService;
import com.daar.mylibrary.utils.Constants;
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
import org.springframework.util.StopWatch;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
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
    @ApiResponse(responseCode = "404", description = "User not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @GetMapping("/{id}")
    public ResponseEntity<Response> getUserSuggestion(@PathVariable String id, @RequestHeader(name = "Authorization", required = false) String token) {
        if (!Objects.equals(id, Constants.decodeToken(token).sub)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("User id does not match"));
        try {
            StopWatch watch = new StopWatch();
            watch.start();
            List<Response> suggestion = usersService.suggestionBooks(id).stream().map(BooksShortResponse::new).collect(Collectors.toList());
            watch.stop();
            return ResponseEntity.status(HttpStatus.OK).body(new ListResponse(suggestion, watch.getTotalTimeMillis(), "SUGGESTION_BOOKS"));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @Operation(summary = "Add User into db", description = "Allows to add user to save readen books and suggest other.\n")
    @ApiResponse(responseCode = "200", description = "User added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @PostMapping("/{id}")
    public ResponseEntity<Response> addUser(@PathVariable String id) {
        return ResponseEntity.status(HttpStatus.OK).body(new UserResponse(usersService.addUser(id)));
    }

    @Operation(summary = "Add User into db", description = "Allows to add user to save readen books and suggest other.\n")
    @ApiResponse(responseCode = "200", description = "User added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "404", description = "User not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PatchMapping("/{id}/read/{book_id}")
    public ResponseEntity<Response> addUserBook(@PathVariable String id, @PathVariable(name = "book_id") String bookId, @RequestHeader(name = "Authorization", required = false) String token) {
        if (!Objects.equals(id, Constants.decodeToken(token).sub)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("User id does not match"));
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new UserResponse(usersService.addBooksRead(id, bookId)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Add User into db", description = "Allows to add user to save readen books and suggest other.\n")
    @ApiResponse(responseCode = "200", description = "User added", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "404", description = "User not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @PatchMapping("/{id}/keywords")
    public ResponseEntity<Response> addUserSearch(@PathVariable String id, @RequestBody List<String> keywords, @RequestHeader(name = "Authorization", required = false) String token) {
        if (!Objects.equals(id, Constants.decodeToken(token).sub)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("User id does not match"));
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new UserResponse(usersService.addKeyword(id, keywords)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }

    @Operation(summary = "Delete an User", description = "Allows to delete an user.\n ### Permissions needed to access resources : \n- read:users\n- \n- delete:users")
    @ApiResponse(responseCode = "200", description = "User removed", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ElementRemovedResponse.class)) })
    @ApiResponse(responseCode = "404", description = "User not founded", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @ApiResponse(responseCode = "500", description = "Internal error", content = { @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)) })
    @SecurityRequirement(name = "globalSecurity")
    @DeleteMapping("/{id}")
    public ResponseEntity<Response> deleteUser(@PathVariable String id, @RequestHeader(name = "Authorization", required = false) String token) {
        if (!Objects.equals(id, Constants.decodeToken(token).sub)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorResponse("User id does not match"));
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new UserResponse(usersService.deleteUser(id)));
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse(e.getMessage()));
        }
    }
}
