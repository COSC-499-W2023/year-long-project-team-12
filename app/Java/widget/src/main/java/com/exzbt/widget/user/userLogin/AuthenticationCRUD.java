package com.exzbt.widget.user.userLogin;

import com.exzbt.business.user.shared.AuthenticationRequest;
import com.exzbt.business.user.shared.AuthenticationResponse;
import com.exzbt.business.user.userLogin.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
public class AuthenticationCRUD {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = authenticationService.login(request);

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .build();
    }
}
