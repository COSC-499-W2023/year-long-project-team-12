package com.exzbt.usertransaction.appuser.api;

import com.exzbt.usertransaction.appuser.impl.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserTransactions extends MongoRepository<AppUser, String> {
    @Query("{'email': ?0}")
    Optional<AppUser> findByEmail(String email);
    @Query("{ 'username': ?0 }")
    Optional<AppUser> findByUsername(String username);
    @Query("{'firstName': ?0}")
    Optional<AppUser> findByFirstName(String firstname);

}
