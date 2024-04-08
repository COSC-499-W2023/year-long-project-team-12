package com.exzbt.business.user;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.s3.S3Buckets;
import com.exzbt.s3.transactions.S3Actions;
import com.exzbt.transaction.appuser.api.UserTransactions;
import com.exzbt.transaction.appuser.impl.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService  {
    private final static String USER_NOT_FOUND = "user with email %s not found";

    @Autowired
    private UserTransactions userTransaction;

    @Autowired
    private S3Actions s3Actions;

    private S3Buckets s3Buckets;

    public UserDetailsDTO findUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = userTransaction.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, username)));

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        return userDetailsDTO.convertDTO(user);
    }

    public AppUser findUserByUsernameLogin(String username) throws UsernameNotFoundException {
        return userTransaction.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, username)));
    }

    public AppUser findUserByEmailLogin(String email) throws UsernameNotFoundException {
        return userTransaction.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, email)));
    }

    public UserDetailsDTO findUserByEmail(String email) throws UsernameNotFoundException {
        return userTransaction.findByEmail(email)
                .map(user -> new UserDetailsDTO().convertDTO(user))
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));
    }

    public List<UserDetailsDTO> getAllUsers() {
        List<AppUser> users = userTransaction.findAll();
        return users.stream().map(user -> new UserDetailsDTO().convertDTO(user)).toList();
    }

    public UserDetailsDTO getUser(String id) {
        return userTransaction.findById(id)
                .map(user -> new UserDetailsDTO().convertDTO(user))
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));
    }

    public UserDetailsDTO saveChanges(String id, UserDetailRequest updateRequest) {
        AppUser user = userTransaction.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));

        if(Objects.isNull(updateRequest)) {
            //TODO: exception throw
            return null;
        }

        user.setFirstName(updateRequest.getFirstName());
        user.setLastName(updateRequest.getLastName());
        if (Objects.nonNull(updateRequest.getPassword()) && !updateRequest.getPassword().isEmpty()) {
            user.setPassword(updateRequest.getPassword());
        }

        return new UserDetailsDTO().convertDTO(userTransaction.save(user));
    }

    public void deleteUserById(String userId) {
        if (!userTransaction.existsById(userId)) {
            //TODO: exception throw
            return;
        }
        userTransaction.deleteById(userId);
    }

    public void uploadUserProfileImage(String userId, MultipartFile file) {
        if (!userTransaction.existsById(userId)) {
            //TODO: exception throw
            return;
        }

        String imageId = UUID.randomUUID().toString();
        try {
            s3Actions.putObject(
                    s3Buckets.getAppUser(),
                    String.format("profileImage/%s/%s", userId, imageId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload profile image", e);
        }

        AppUser user = userTransaction.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));

        user.setProfileImageId(imageId);
        userTransaction.save(user);
    }

    public byte[] getUserProfileImage(String userId) {
        AppUser user = userTransaction.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException(USER_NOT_FOUND));

        if (Objects.isNull(user.getProfileImageId())) {
            //TODO: exception throw
            return null;
        }

        return s3Actions.getObject(
                    s3Buckets.getAppUser(),
                    String.format("profileImage/%s/%s", userId, user.getProfileImageId())
        );
    }
}

