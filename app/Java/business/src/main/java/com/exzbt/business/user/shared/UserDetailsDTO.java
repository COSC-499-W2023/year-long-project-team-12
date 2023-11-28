package com.exzbt.business.user.shared;

import com.exzbt.usertransaction.appuser.impl.AppUser;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class UserDetailsDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String userRole;

    public UserDetailsDTO convertDTO(AppUser user) {
        this.setId(user.getUserId());
        this.setUsername(user.getUsername());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setEmail(user.getEmail());
        this.setUserRole(user.getUserRole());

        return this;
    }
}
