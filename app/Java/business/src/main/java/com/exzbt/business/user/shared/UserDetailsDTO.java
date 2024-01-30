package com.exzbt.business.user.shared;

import com.exzbt.transaction.appuser.impl.AppUser;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class UserDetailsDTO {
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String userRole;
    private String profileImageId;

    public UserDetailsDTO convertDTO(AppUser user) {
        this.setUserId(user.getUserId());
        this.setUsername(user.getUsername());
        this.setFirstName(user.getFirstName());
        this.setLastName(user.getLastName());
        this.setEmail(user.getEmail());
        this.setUserRole(user.getUserRole());
        this.setProfileImageId(user.getProfileImageId());

        return this;
    }
}
