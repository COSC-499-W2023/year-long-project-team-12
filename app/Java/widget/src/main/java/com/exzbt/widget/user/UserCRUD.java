package com.exzbt.widget.user;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.UserService;
import com.exzbt.business.user.shared.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/users")
public class UserCRUD {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDetailsDTO> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public UserDetailsDTO getUser(@PathVariable("id") String id) {
        return userService.getUser(id);
    }

    @PostMapping("{id}")
    public UserDetailsDTO saveChanges(@PathVariable("id") String id,
            @RequestBody UserDetailRequest updateRequest) {
        return userService.saveChanges(id, updateRequest);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable("id") String id) {
        userService.deleteUserById(id);
    }

    @PostMapping(
            value = "{id}/profileImage",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void updateUserProfileImage(
            @PathVariable("id") String id,
            @RequestParam("image") MultipartFile file){
        userService.uploadUserProfileImage(id, file);
    }

    @GetMapping(
            value = "{id}/profileImage",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getUserProfileImage(@PathVariable("id") String id){
        return userService.getUserProfileImage(id);
    }
}
