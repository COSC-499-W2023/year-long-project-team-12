package com.exzbt.business.user.userRegistration;

import com.exzbt.business.user.security.jwt.JWTUtil;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.business.user.shared.UserRegistrationRequest;
import com.exzbt.transaction.appuser.api.UserTransactions;
import com.exzbt.transaction.appuser.impl.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userRegistrationService {
    @Autowired
    private UserTransactions userTransactions;
    @Autowired
    private JWTUtil jwtUtil;

    public AuthenticationResponse register(UserRegistrationRequest userRegistrationRequest){
        AppUser user = userTransactions.save(userRegistrationRequest.convertFromDTO());
        String token = jwtUtil.issueToken(user.getUsername());
        return new AuthenticationResponse(token, new UserDetailsDTO().convertDTO(user));
    }
}
