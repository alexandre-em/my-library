package com.daar.mylibrary.dto.response;

public class ErrorResponse implements Response {
    public String message;
    public Long requestTime;
//    private String logId;

    public ErrorResponse(String message) {
        this.message=message;
//        this.logId=logId;
    }
    public ErrorResponse(String message, Long requestTime) {
        this.message=message;
        this.requestTime=requestTime;
//        this.logId=logId;
    }
}
