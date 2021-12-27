package com.daar.mylibrary.dto.response;

public class ErrorResponse implements Response {
    private String message;
//    private String logId;

    public ErrorResponse(String message) {
        this.message=message;
//        this.logId=logId;
    }

    public String getMessage() {
        return message;
    }
}
