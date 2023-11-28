package com.exzbt.business.user.userRegistration;

import com.exzbt.business.user.security.jwt.JWTUtil;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.usertransaction.appuser.api.UserTransactions;
import com.exzbt.usertransaction.appuser.impl.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userRegistrationService {
    @Autowired
    private UserTransactions userTransactions;
    @Autowired
    private JWTUtil jwtUtil;

    public AuthenticationResponse register(UserDetailRequest userDetailRequest){
        AppUser user = userTransactions.save(convertFromDTO(userDetailRequest));
        String token = jwtUtil.issueToken(user.getUsername());
        return new AuthenticationResponse(token, new UserDetailsDTO().convertDTO(user));
    }

    private AppUser convertFromDTO(UserDetailRequest userDetailRequest) {
        AppUser AppUser = new AppUser();
        AppUser.setFirstName(userDetailRequest.getFirstName());
        AppUser.setLastName(userDetailRequest.getLastName());
        AppUser.setEmail(userDetailRequest.getEmail());
        AppUser.setUsername(userDetailRequest.getUsername());
        AppUser.setPassword(userDetailRequest.getPassword());
        AppUser.setUserRole(userDetailRequest.getUserRole());

        return AppUser;
    }
}
