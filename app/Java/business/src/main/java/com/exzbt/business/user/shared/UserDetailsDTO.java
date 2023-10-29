package com.exzbt.business.user.shared;

import com.exzbt.usertransaction.appuser.impl.CandidateUser;
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

    public UserDetailsDTO convertDTO(CandidateUser user) {
        UserDetailsDTO userDTO =  new UserDetailsDTO();
        userDTO.setId(user.getUserId());
        userDTO.setUsername(user.getUsername());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setEmail(user.getEmail());

        return userDTO;
    }
}
