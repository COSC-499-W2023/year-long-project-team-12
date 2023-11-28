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
        UserDetailsDTO userDTO =  new UserDetailsDTO();
        userDTO.setId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());
        userDTO.setUserRole(user.getUserRole());

        return userDTO;
    }
}
