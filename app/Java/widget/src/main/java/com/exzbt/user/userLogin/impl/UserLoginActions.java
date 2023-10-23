package com.exzbt.user.userLogin.impl;

public class UserLoginActions {
    private String username;
    private String password;
    private userLoginDTO userLoginDTO;

    public Object getUserLogin (Object userAttempt) {
        userLoginDTO.convertToDTO(userAttempt);
        return null;
    }

    public Object updateUserLogin (Object userAttempt) {
        userLoginDTO.convertToDTO(userAttempt);
        return null;
    }

    public Object deleteUserLogin (Object userAttempt) {
        userLoginDTO.convertToDTO(userAttempt);
        return null;
    }
}
