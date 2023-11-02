package com.exzbt.widget.user;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.UserService;
import com.exzbt.business.user.userRegistration.userRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/user")
public class UserCRUD {
    @Autowired
    private userRegistrationService registrationService;
    @Autowired
    private UserService userService;

    @GetMapping("{id}")
    public List<UserDetailRequest> findUser(@PathVariable String id) {
        return userService.findAllUsers();
    }

    @GetMapping("get/all/1")
    public List<UserDetailRequest> findAllUsers() {
        return userService.findAllUsers();
    }

    public Object deleteUser(Object userAttempt) {
        return null;
    }

}
