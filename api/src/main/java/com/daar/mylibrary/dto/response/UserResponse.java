package com.daar.mylibrary.dto.response;


import com.daar.mylibrary.data.User;

public class UserResponse implements Response {
  private User user;

  public UserResponse(User user) {
    this.user = user;
  }

  public String getId() {
    return user.getUserId();
  }

}
