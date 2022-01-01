package com.daar.mylibrary.exception;

public abstract class AbstractApiException extends Exception {
    private final String message;

    public AbstractApiException(String message) {
        this.message=message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
