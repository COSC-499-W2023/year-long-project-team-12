import com.mongodb.client.MongoCollection;
import mongodbclient.MongoDBAtlasClient;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class TestMongoDBClient {
    public static void main(String[] args) {
        MongoDBAtlasClient mongoDBAtlasClient = new MongoDBAtlasClient();
        MongoCollection<Document> collection = mongoDBAtlasClient
                .readDatabaseCollection("EXZBT_USERDATA","UserAuthentication");

        Document doc = collection.find(eq("_id", "TestFind")).first();
        if (doc != null) {
            System.out.println(doc.toJson());
        } else {
            System.out.println("No matching documents found.");
        }
    }
}
