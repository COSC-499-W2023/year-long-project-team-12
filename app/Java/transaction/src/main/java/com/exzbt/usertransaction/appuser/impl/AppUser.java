package com.exzbt.usertransaction.appuser.impl;

import com.exzbt.usertransaction.appuser.api.UserDetails;

import com.exzbt.usertransaction.appuser.api.UserRole;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("UserData")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppUser implements UserDetails {
    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private UserRole role;

    public void setUserRole(String userRoleEntry) {
        this.role = userRoleEntry.equalsIgnoreCase("Candidate")? UserRole.CANDIDATE:UserRole.HIRING;
    }

    public String getUserRole() {
        return role.toString();
    }
}