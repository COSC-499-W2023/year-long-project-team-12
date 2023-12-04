package com.exzbt.jobposting.api;

import com.exzbt.jobposting.impl.JobPosting;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface JobPostingActions extends MongoRepository<JobPosting, String> {
    @Query("{'hiringUserId': ?0}")
    List<JobPosting> findByHiringUserId(String userId);

    @Query("{'location': ?0}")
    List<JobPosting> findByLocation(String location);

    @Query("{'hiringCompany': ?0}")
    List<JobPosting> findByHiringCompany(String hiringCompany);

}
