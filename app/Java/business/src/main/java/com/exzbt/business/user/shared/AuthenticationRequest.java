package com.exzbt.business.user.shared;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class AuthenticationRequest {
    private String email;
    private String username;
    private String password;

}
