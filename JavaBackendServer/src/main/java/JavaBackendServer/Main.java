/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer;

import JavaBackendServer.Controllers.NotificationsController;
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
import static io.javalin.apibuilder.ApiBuilder.get;
import static io.javalin.apibuilder.ApiBuilder.path;
import static io.javalin.apibuilder.ApiBuilder.post;
import static io.javalin.core.security.SecurityUtil.roles;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 *
 * @author wa1
 */
public class Main {

    public static void main(String[] args) throws FileNotFoundException, IOException, InterruptedException, ExecutionException, FirebaseMessagingException {
        Javalin app = Javalin.create().start(7000);
        FileInputStream serviceAccount = new FileInputStream("./ServiceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://gfras-8ded2.firebaseio.com")
                .build();

        FirebaseApp.initializeApp(options);
        Firestore db = FirestoreClient.getFirestore();
        app.routes(() -> {
            path("/", () -> {

            });
            path("/notifications", () -> {
                path("/:courseId/:date", () -> {
                    get(NotificationsController::SendNotificationToCourse);
                });
                 path("/:courseId/:studentNum/:date", () -> {
                    get(NotificationsController::markStudentAsPresentSendNotification);
                    
                });
                 
            });
            path("/reminder",()->{
                 path("/quiz/:courseId/", () -> {
                    get(NotificationsController::sendReminderToClassNow);
                });
                 path("/quiz/:courseId/:date", () -> {
                    get(NotificationsController::sendReminderscheduled);
                });
        });

        });

    }

}
