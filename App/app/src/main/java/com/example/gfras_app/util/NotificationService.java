package com.example.gfras_app.util;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.example.gfras_app.R;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class NotificationService extends FirebaseMessagingService {
    private static final String CHANNEL_ID = "1";

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);


    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        Notification newMessageNotification;
        if( remoteMessage.getData().get("type")!=null &&remoteMessage.getData().get("type").equals("taskReminder")) {
            newMessageNotification = new Notification.Builder(getApplicationContext(), CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_baseline_students_24)
                    .setContentTitle(remoteMessage.getData().get("courseName") + ": " + remoteMessage.getData().get("title"))
                    .setContentText(remoteMessage.getData().get("date") + " at " + remoteMessage.getData().get("time") )
                    .build();
        } else {
             newMessageNotification = new Notification.Builder(getApplicationContext(), CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_baseline_students_24)
                    .setContentTitle("Attendance!")
                    .setContentText(remoteMessage.getData().get("text"))
                    .build();
        }

        // Issue the notification.
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        notificationManager.notify(2, newMessageNotification);


    }
}
