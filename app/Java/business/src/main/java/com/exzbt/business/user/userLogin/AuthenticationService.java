package com.exzbt.business.user.userLogin;

import com.exzbt.business.user.security.CustomAuthenticationProvider;
import com.exzbt.business.user.security.jwt.JWTUtil;
import com.exzbt.business.user.shared.*;
import com.exzbt.transaction.appuser.impl.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthenticationService {
    @Autowired
    private CustomAuthenticationProvider authenticationManager;
    @Autowired
    private JWTUtil jwtUtil;

    public AuthenticationResponse login(AuthenticationRequest request) {
        String loginParam = "";
        Authentication authentication = null;

        if(Objects.isNull(request.getEmail())){
            loginParam = request.getUsername();
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginParam,
                            request.getPassword()
                    )
            );
        }else {
            loginParam = request.getEmail();
            authentication = authenticationManager.authenticateByEmail(
                    new UsernamePasswordAuthenticationToken(
                            loginParam,
                            request.getPassword()
                    )
            );
        }

        AppUser user = (AppUser) authentication.getPrincipal();
        String token = jwtUtil.issueToken(user.getUsername());
        return new AuthenticationResponse(token, new UserDetailsDTO().convertDTO(user));
    }
}
