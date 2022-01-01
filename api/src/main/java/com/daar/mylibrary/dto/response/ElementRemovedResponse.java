package com.daar.mylibrary.dto.response;

public class ElementRemovedResponse implements Response {
    private String uuid;
    private String classType;

    public ElementRemovedResponse(String uuid, String classType) {
        this.uuid=uuid;
        this.classType=classType;
    }

    public String getId() {
        return uuid;
    }

    public String getMessage() {
        return classType + "successfully removed !";
    }
}
