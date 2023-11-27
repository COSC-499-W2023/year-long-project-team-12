package com.exzbt.widget.user.userLogin;

import com.exzbt.business.user.shared.AuthenticationRequest;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.business.user.userLogin.AuthenticationService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationCRUDTest {
    @Mock
    private AuthenticationService authenticationService;
    @InjectMocks
    private AuthenticationCRUD underTest;

    @Test
    public void login_whenCredentialsAreEmpty_thenReturnAnEmptyResponseBody() {
        AuthenticationResponse expected = new AuthenticationResponse();
        when(authenticationService.login(any(AuthenticationRequest.class)))
                .thenReturn(expected);
        ResponseEntity<?> response = underTest.login(new AuthenticationRequest());
        assertEquals(expected, response.getBody());
    }

    @Test
    public void createUser_whenCredentialsAreValid_thenReturnValidResponseBody() {
        AuthenticationResponse expected = new AuthenticationResponse(
                "token",new UserDetailsDTO());
        AuthenticationRequest request =
                new AuthenticationRequest("email", "username", "password");
        when(authenticationService.login(any(AuthenticationRequest.class)))
                .thenReturn(expected);
        ResponseEntity<?> response = underTest.login(request);
        assertEquals(expected, response.getBody());
    }
}
