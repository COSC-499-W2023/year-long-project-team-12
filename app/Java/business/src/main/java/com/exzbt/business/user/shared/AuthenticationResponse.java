package com.exzbt.business.user.shared;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class AuthenticationResponse {
    private String token;
    private UserDetailsDTO userDetailsDTO;
}
