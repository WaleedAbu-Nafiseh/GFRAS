/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer;

import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutures;
import io.javalin.Javalin;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 *
 * @author wa1
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws FileNotFoundException, IOException, InterruptedException, ExecutionException, FirebaseMessagingException {
        // TODO code application logic here
        Javalin app = Javalin.create().start(7000);
        FileInputStream serviceAccount = new FileInputStream("./ServiceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://gfras-8ded2.firebaseio.com")
                .build();

        FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();

        app.get("/", ctx -> {
            DocumentReference docRef = db.collection("students").document("IUKQbpJI1rcYSNGCaxRt");
// asynchronously retrieve the document
            ApiFuture<DocumentSnapshot> future = docRef.get();
// ...
// future.get() blocks on response
            DocumentSnapshot document = future.get();
            if (document.exists()) {
                System.out.println("Document data: " + document.getData());
            } else {
                System.out.println("No such document!");
            }

            // asynchronously retrieve the document
            if (document.exists()) {
                ctx.result(document.getString("firstName") + "");
            } else {
                ctx.result("Nope");

            }
            // This registration token comes from the client FCM SDKs.
            String registrationToken = "c1zBptnKR0GGsB-k-Wf3tl:APA91bEUWAMV_D2p74o2wePA5JKrm_p2KV3au-Z1HOe6qIVLIhSpjEaK_8KFF-Vi9a3yGXcUUt44-DxCiajCn1A3wZiTKfdiX_VIUHqsBUJx_2YuAl3NIR8LOc0j54JxrsB9LHtevaEq";

// See documentation on defining a message payload.
            Message message = Message.builder()
                    .putData("score", "850")
                    .putData("time", "2:45")
                    .setToken(registrationToken)
                    .build();

// Send a message to the device corresponding to the provided
// registration token.
            String response = FirebaseMessaging.getInstance().send(message);
// Response is a message ID string.
            System.out.println("Successfully sent message: " + response);

        });

    }

}
