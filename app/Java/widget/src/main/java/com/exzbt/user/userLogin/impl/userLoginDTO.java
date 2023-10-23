package com.exzbt.user.userLogin.impl;

import com.exzbt.user.userLogin.api.UserLogin;

public class userLoginDTO {
    private UserLogin UserLogin;
    public UserLogin convertToDTO(Object userLoginDetail) {
        UserLogin.setUsername(userLoginDetail.toString());
        UserLogin.setPassword(userLoginDetail.toString());
        return UserLogin;
    }
}
