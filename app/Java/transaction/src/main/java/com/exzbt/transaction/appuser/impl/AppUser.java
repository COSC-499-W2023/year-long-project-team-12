package com.exzbt.transaction.appuser.impl;

import com.exzbt.transaction.appuser.api.UserDetails;
import com.exzbt.transaction.appuser.api.UserRole;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "AppUser")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AppUser implements UserDetails {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String userId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public void setUserRole(String userRoleEntry) {
        this.role = UserRole.valueOf(userRoleEntry.toUpperCase());
    }

    public String getUserRole() {
        return role.toString();
    }
}