package com.daar.mylibrary.controller;

import com.daar.mylibrary.dto.response.Authors.AuthorsResponse;
import com.daar.mylibrary.dto.response.ErrorResponse;
import com.daar.mylibrary.dto.response.Response;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path = "/api/v1/authors", produces = MediaType.APPLICATION_JSON_VALUE)
@Tag(name="Authors", description = "Gutenberg's authors")
@CrossOrigin(origins = "*")
public class AuthorsController {
    @Autowired
    private AuthorsService authorsService;

}
