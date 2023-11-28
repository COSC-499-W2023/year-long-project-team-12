package com.exzbt.business.user.shared;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class UserDetailRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String username;
    private String userRole;
}

