package com.daar.mylibrary.dto.response;

import java.util.List;

public class PaginationResponse implements Response {
    public int limit;
    public int current;
    public List<Response> data;

    public PaginationResponse(int limit, int current, List<Response> data) {
        this.limit=limit;
        this.current=current;
        this.data=data;
    }
}
