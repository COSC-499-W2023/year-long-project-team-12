package com.exzbt.usertransaction.appuser.impl;

import com.exzbt.mongoDBclient.MongoDBAtlasClient;
import com.exzbt.usertransaction.appuser.api.UserDetails;

import org.bson.Document;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class CandidateUser implements UserDetails {
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
    @Inject
    private MongoDBAtlasClient dbClient;
    private final String DatabaseName = "EXZBT_USERDATA";

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

    public void insert(String Collection){
        Document user = new Document();
        user.append("UserID", getUserId());
        user.append("First Name", getFirstName());
        user.append("Last Name", getLastName());
        user.append("Email", getEmail());
        user.append("Username", getUsername());
        user.append("Password", getPassword());
        dbClient.writeToDatabaseCollection(DatabaseName,
                Collection, user);
    }
    public void read(String Collection) {
        dbClient.readDatabaseCollection(DatabaseName, Collection);
    }
    public void update(){

    }
    public void delete(){

    }
}
