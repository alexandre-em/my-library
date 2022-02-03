package com.daar.mylibrary.dto.response;

import org.springframework.data.domain.Page;

import java.util.List;

public class PaginationResponse implements Response {
    public int totalPage;
    public Long totalElement;
    public int current;
    public List<Response> data;
    public Long requestTime;

    public PaginationResponse(Page<Response> data, Long requestTime) {
        this.totalPage = data.getTotalPages();
        this.current = data.getNumberOfElements();
        totalElement = data.getTotalElements();
        this.data=data.toList();
        this.requestTime=requestTime;
    }
}
