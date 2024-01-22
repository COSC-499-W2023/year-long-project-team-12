package com.exzbt.business.user.security;

import com.exzbt.business.user.UserService;
import com.exzbt.transaction.appuser.impl.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private final UserService userService;
    public CustomAuthenticationProvider(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        AppUser user = userService.findUserByUsernameLogin(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        if (!password.equals(user.getPassword())) {
            throw new AuthenticationException("Invalid credentials") {};
        }

        Authentication authenticated = new UsernamePasswordAuthenticationToken(
                user, password, Collections.emptyList());
        return authenticated;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
