package com.exzbt.widget.user.userRegistration;

import com.exzbt.business.user.UserService;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.business.user.shared.UserRegistrationRequest;
import com.exzbt.business.user.userRegistration.userRegistrationService;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class UserRegistrationCRUDTest {
    @Mock
    private userRegistrationService registrationService;
    @Mock
    private UserService userService;
    @InjectMocks
    private UserRegistrationCRUD underTest;

    @Test
    public void createUser_whenEmptyUser_thenReturnAnEmptyResponseBody() {
        AuthenticationResponse expected = new AuthenticationResponse();

        when(registrationService.register(any(UserRegistrationRequest.class)))
                .thenReturn(expected);
        ResponseEntity<?> response = underTest.createUser(new UserRegistrationRequest());
        assertEquals(expected, response.getBody());
    }

    @Test
    public void createUser_whenValidUser_thenReturnValidResponseBody() {
        AuthenticationResponse expected = new AuthenticationResponse(
               "token",new UserDetailsDTO());
        when(registrationService.register(any(UserRegistrationRequest.class)))
                .thenReturn(expected);
        ResponseEntity<?> response = underTest.createUser(new UserRegistrationRequest());
        assertEquals(expected, response.getBody());
    }
}
