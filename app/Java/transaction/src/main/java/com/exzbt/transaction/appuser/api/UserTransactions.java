package com.exzbt.transaction.appuser.api;

import com.exzbt.transaction.appuser.impl.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserTransactions extends JpaRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByUsername(String username);
    Optional<AppUser> findByFirstName(String firstname);

}
