package com.exzbt.user.userLogin.api;

public class UserLogin {
    private String username;
    private String password;
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserLogin convertToDTO(Object userLoginDetail) {
        UserLogin UserLogin = new UserLogin();
        //userLogin.setUsername(userLoginDetail.toString());
        //userLogin.setPassword(userLoginDetail.toString());
        return UserLogin;
    }

    @Override
    public String toString() {
        return "getUserLogin{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
