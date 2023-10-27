package com.exzbt.mongoDBclient;

import com.mongodb.client.MongoCollection;
import org.bson.Document;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.springframework.stereotype.Component;

@Component
public class MongoDBAtlasClient {
    private static MongoClient mongoClient;
    private static void connectToDatabase() {
        String uri =
                "mongodb+srv://hkarim01:RSIkDPXUVSRnfpjd@cluster0.6mfdlm4.mongodb.net/?retryWrites=true&w=majority";
        mongoClient = MongoClients.create(uri);
    }

    public MongoCollection<Document> readDatabaseCollection(String DatabaseName, String CollectionName) {
        connectToDatabase();
        MongoDatabase database = mongoClient.getDatabase(DatabaseName);
        return database.getCollection(CollectionName);
    }

    public Document writeToDatabaseCollection(String DatabaseName, String CollectionName, Document document) {
        connectToDatabase();
        MongoDatabase database = mongoClient.getDatabase(DatabaseName);
        database.getCollection(CollectionName).insertOne(document);
        return document;
    }
}

