/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer.Controllers;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import io.javalin.http.Context;

/**
 *
 * @author wa1
 */
public class NotificationsController {

    public static void SendNotificationToUser(Context ctx) throws FirebaseMessagingException {
                    // This registration token comes from the client FCM SDKs.
                String registrationToken = ctx.pathParam("userID");

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

            ctx.result(ctx.pathParam("userID"));
    }
}
