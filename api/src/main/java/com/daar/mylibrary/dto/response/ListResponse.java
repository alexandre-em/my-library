package com.daar.mylibrary.dto.response;

import java.util.List;

public class ListResponse implements Response {
    public List<Response> data;
    public Long requestTime;
    public String type;

    public ListResponse() { }
    public ListResponse(List<Response> data, Long requestTime, String type) {
        this.data=data;
        this.requestTime=requestTime;
        this.type=type;
    }
}
