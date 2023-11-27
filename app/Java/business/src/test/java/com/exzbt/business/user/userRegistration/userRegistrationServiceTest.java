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
public class userRegistrationServiceTest {
    @Autowired
    private UserTransactions userTransactions;

    @Autowired
    private JWTUtil jwtUtil;

    public AuthenticationResponse register(UserDetailRequest userDetailRequest){
        AppUser appUser = userTransactions.save(convertFromDTO(userDetailRequest));
        String token = jwtUtil.issueToken(appUser.getUsername());
        return new AuthenticationResponse(token, new UserDetailsDTO().convertDTO(appUser));
    }

    private AppUser convertFromDTO(UserDetailRequest userDetailRequest) {
        AppUser appUser = new AppUser();
        appUser.setFirstName(userDetailRequest.getFirstName());
        appUser.setLastName(userDetailRequest.getLastName());
        appUser.setEmail(userDetailRequest.getEmail());
        appUser.setUsername(userDetailRequest.getUsername());
        appUser.setPassword(userDetailRequest.getPassword());
        appUser.setUserRole(userDetailRequest.getUserRole());

        return appUser;
    }
}
