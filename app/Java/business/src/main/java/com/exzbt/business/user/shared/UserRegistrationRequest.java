package com.exzbt.business.user.shared;

import com.exzbt.transaction.appuser.impl.AppUser;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class UserRegistrationRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String username;
    private String userRole;

    public AppUser convertFromDTO() {
        AppUser AppUser = new AppUser();
        AppUser.setFirstName(this.getFirstName());
        AppUser.setLastName(this.getLastName());
        AppUser.setEmail(this.getEmail());
        AppUser.setUsername(this.getUsername());
        AppUser.setPassword(this.getPassword());
        AppUser.setUserRole(this.getUserRole());

        return AppUser;
    }
}


