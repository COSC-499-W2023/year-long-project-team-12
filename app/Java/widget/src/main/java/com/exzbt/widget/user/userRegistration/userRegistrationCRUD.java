package com.exzbt.widget.user.userRegistration;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.UserService;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.business.user.userRegistration.userRegistrationService;
import com.exzbt.business.user.security.jwt.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/")
public class userRegistrationCRUD {
    @Autowired
    private userRegistrationService registrationService;
    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;

    @GetMapping("get/{username}")
    public UserDetailsDTO findByUsername(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserDetailRequest request) {
        UserDetailRequest userDetailRequest = registrationService.register(request);
        String jwtToken = jwtUtil.issueToken(request.getEmail());

        ResponseEntity entity = ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, jwtToken)
                .build();
        return entity;
    }

    public Object deleteUser(Object userAttempt) {
        return null;
    }
}
