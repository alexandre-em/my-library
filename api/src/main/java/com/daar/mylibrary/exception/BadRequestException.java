package com.daar.mylibrary.exception;

public class BadRequestException extends AbstractApiException {
    public BadRequestException(String message) {
        super(message);
    }
}
