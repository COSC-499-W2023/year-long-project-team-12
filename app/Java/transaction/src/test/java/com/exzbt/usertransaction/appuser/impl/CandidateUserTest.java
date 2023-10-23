package com.exzbt.usertransaction.appuser.impl;

import com.exzbt.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class CandidateUserTest extends AppConfig {
    private static CandidateUser candidateUser;
    @Autowired
    private CandidateUser candidateUser1;
    @PostConstruct
    private void init() {
        candidateUser = this.candidateUser1;
    }

    public static void main(String[] args) {
        test();
    }

    public static void test(){
        candidateUser.setFirstName("Yetunde");
        candidateUser.setLastName("Karim");
        candidateUser.setUserId("AK123");
        candidateUser.setUsername("HK123");
        candidateUser.setPassword("HZ105");
        candidateUser.insert("UserAuthentication");
    }
}
