package com.daar.mylibrary.service;

import com.daar.mylibrary.data.Authors;
import com.daar.mylibrary.exception.NotFoundException;
import com.daar.mylibrary.repository.AuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorsService {
    @Autowired
    private AuthorsRepository authorsRepository;

    public List<Authors> searchAuthors(String input) {
        return authorsRepository.findAuthorsByNameContains(input, PageRequest.of(1, 20));
    }
    public List<Authors> findAll(int page, int limit) {
        return authorsRepository.findAll(PageRequest.of(page, limit));
    }
    public Authors findById(String uuid) throws NotFoundException {
        Authors author = authorsRepository.findAuthorsByAuthorId(uuid);
        if (author == null) throw new NotFoundException("Author not found");
        return author;
    }
}
