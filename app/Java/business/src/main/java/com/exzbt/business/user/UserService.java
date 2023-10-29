package com.exzbt.business.user;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.usertransaction.appuser.api.UserDetails;
import com.exzbt.usertransaction.appuser.api.UserTransactions;
import com.exzbt.usertransaction.appuser.impl.CandidateUser;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService  {
    private final static String USER_NOT_FOUND = "user with email %s not found";

    private UserTransactions userTransaction;

    public UserDetailsDTO findUserByUsername(String username) throws UsernameNotFoundException {
        CandidateUser user = userTransaction.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, username)));

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setId(user.getUserId());
        userDetailsDTO.setUsername(user.getUsername());
        userDetailsDTO.setFirstName(user.getFirstName());
        userDetailsDTO.setLastName(user.getLastName());
        userDetailsDTO.setEmail(user.getEmail());

        return userDetailsDTO;
    }
    public CandidateUser findUserByUsernameLogin(String username) throws UsernameNotFoundException {
        return userTransaction.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, username)));
    }


    public UserDetails findUserByFirstName(String firstname) throws UsernameNotFoundException {
        return userTransaction.findByFirstName(firstname)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, firstname)));
    }


    public List<UserDetailRequest> findAllUsers() {
        List<CandidateUser> users = userTransaction.findAll();
        return users.stream().map(user -> {
            UserDetailRequest userDetails = new UserDetailRequest();
            userDetails.setFirstName(user.getFirstName());
            userDetails.setLastName(user.getLastName());
            userDetails.setEmail(user.getEmail());
            userDetails.setUsername(user.getUsername());

            return userDetails;
        }).toList();
    }

    public UserDetails findUserByEmail(String email) throws UsernameNotFoundException {
        return userTransaction.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(
                        String.format(USER_NOT_FOUND, email)));
    }
}

