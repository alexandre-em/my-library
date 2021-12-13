package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.repository.AuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorsService {
    @Autowired
    private AuthorsRepository authorsRepository;

    public List<Authors> searchAuthors(String input) {
        return authorsRepository.findAuthorsByNameContains(input);
    }
}
