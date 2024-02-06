package com.exzbt.business.user.userLogin;

import com.exzbt.business.user.security.CustomAuthenticationProvider;
import com.exzbt.business.user.security.jwt.JWTUtil;
import com.exzbt.business.user.shared.AuthenticationRequest;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.transaction.appuser.api.UserRole;
import com.exzbt.transaction.appuser.impl.AppUser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationServiceTest {
    @Mock
    private CustomAuthenticationProvider authenticationManager;
    @Mock
    private JWTUtil jwtUtil;
    @InjectMocks
    private AuthenticationService underTest;

    @Test
    public void login_whenEmailIsValidAndUsernameIsNotValid_thenReturnValidResponse() {
        AuthenticationRequest request = new AuthenticationRequest("email", null, "password");
        AppUser user = new AppUser("1L", "firstName",
                "lastName", "username", "email", "password", UserRole.ADMIN, null);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO("1L", "firstName", "lastName", "email",
                "username", "ADMIN", null);

        when(authenticationManager.authenticateByEmail(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(
                        user, "password", Collections.emptyList()));

        when(jwtUtil.issueToken(eq(user.getUsername()))).thenReturn("token");

        AuthenticationResponse expected = new AuthenticationResponse("token", userDetailsDTO);
        AuthenticationResponse actual = underTest.login(request);

        assertEquals(expected, actual);
    }

    @Test
    public void login_whenUsernameIsValidAndEmailIsNotValid_thenReturnValidResponse() {
        AuthenticationRequest request = new AuthenticationRequest(null, "username", "password");
        AppUser user = new AppUser("1L", "firstName",
                "lastName", "username", "email", "password", UserRole.ADMIN, null);
        UserDetailsDTO userDetailsDTO = new UserDetailsDTO("1L", "firstName", "lastName", "email",
                "username", "ADMIN", null);

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(
                        user, "password", Collections.emptyList()));

        when(jwtUtil.issueToken(eq(user.getUsername()))).thenReturn("token");

        AuthenticationResponse expected = new AuthenticationResponse("token", userDetailsDTO);
        AuthenticationResponse actual = underTest.login(request);

        assertEquals(expected, actual);
    }
}
