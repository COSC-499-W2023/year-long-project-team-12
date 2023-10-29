package com.exzbt.usertransaction.appuser.impl;
import com.exzbt.usertransaction.appuser.api.UserDetails;

import javax.inject.Inject;

public class HiringUser implements UserDetails {
    @Inject
    private String userId;
    @Inject
    private String firstName;
    @Inject
    private String lastName;
    @Inject
    private String username;
    @Inject
    private String email;
    @Inject
    private String password;

    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    @Override
    public String getFirstName() {
        return firstName;
    }

    @Override
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Override
    public String getLastName() {
        return lastName;
    }

    @Override
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getEmail() {
        return email;
    }

    @Override
    public void setEmail(String email) {
        this.email = email;
    }


}
