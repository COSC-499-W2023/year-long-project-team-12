package com.exzbt.usertransaction.appuser.api;

import com.exzbt.usertransaction.appuser.impl.CandidateUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public interface UserTransactions extends MongoRepository<CandidateUser, String> {
    @Query("{'email': ?0}")
    Optional<CandidateUser> findByEmail(String email);
    @Query("{ 'username': ?0 }")
    Optional<CandidateUser> findByUsername(String username);
    @Query("{'firstName': ?0}")
    Optional<CandidateUser> findByFirstName(String firstname);

}
