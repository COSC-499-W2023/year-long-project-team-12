package com.exzbt.mongoDBclient;

import com.exzbt.AppConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class MongoDBAtlasClientTest extends AppConfig {
    private static MongoDBAtlasClient mongoDBAtlasClient1;
    @Autowired
    private MongoDBAtlasClient mongoDBAtlasClient;
    @PostConstruct
    private void init() {
        mongoDBAtlasClient1 = this.mongoDBAtlasClient;
    }
    public static void main(String[] args) {
        mongoDBAtlasClient1.readDatabaseCollection("EXZBT_USERDATA",
                "UserAuthentication");

    }
}

