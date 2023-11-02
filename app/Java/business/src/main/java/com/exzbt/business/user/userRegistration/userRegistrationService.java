package com.exzbt.business.user.userRegistration;

import com.exzbt.business.user.shared.UserDetailRequest;
import com.exzbt.usertransaction.appuser.api.UserTransactions;
import com.exzbt.usertransaction.appuser.impl.CandidateUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class userRegistrationService {
    @Autowired
    private UserTransactions userTransactions;

    public UserDetailRequest register(UserDetailRequest userDetailRequest){
        CandidateUser candidateUser = userTransactions.save(convertFromDTO(userDetailRequest));
        return convertToDTO(candidateUser);
    }

    private CandidateUser convertFromDTO(UserDetailRequest userDetailRequest) {
        CandidateUser candidateUser = new CandidateUser();
        candidateUser.setFirstName(userDetailRequest.getFirstName());
        candidateUser.setLastName(userDetailRequest.getLastName());
        candidateUser.setEmail(userDetailRequest.getEmail());
        candidateUser.setUsername(userDetailRequest.getUsername());
        candidateUser.setPassword(userDetailRequest.getPassword());

        return candidateUser;
    }
    private UserDetailRequest convertToDTO(CandidateUser candidateUser) {
        UserDetailRequest userDetailRequest = new UserDetailRequest();
        userDetailRequest.setFirstName(candidateUser.getFirstName());
        userDetailRequest.setLastName(candidateUser.getLastName());
        userDetailRequest.setEmail(candidateUser.getEmail());
        userDetailRequest.setUsername(candidateUser.getUsername());
        userDetailRequest.setPassword(candidateUser.getPassword());

        return userDetailRequest;
    }
}
