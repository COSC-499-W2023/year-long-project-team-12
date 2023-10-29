package com.exzbt.business.user.userLogin;

import com.exzbt.business.user.security.CustomAuthenticationProvider;
import com.exzbt.business.user.security.jwt.JWTUtil;
import com.exzbt.business.user.shared.*;
import com.exzbt.usertransaction.appuser.impl.CandidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private CustomAuthenticationProvider authenticationManager;
    @Autowired
    private JWTUtil jwtUtil;

    public AuthenticationResponse login(AuthenticationRequest request) {
        String loginParam = request.getEmail() == null? request.getUsername() : request.getEmail();
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        CandidateUser user = (CandidateUser) authentication.getPrincipal();
        String token = jwtUtil.issueToken(user.getUsername());
        return new AuthenticationResponse(token, new UserDetailsDTO().convertDTO(user));
    }
}
