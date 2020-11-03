package com.example.gfras_app.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.gfras_app.Activities.Instructor.InstructorCoursesList;
import com.example.gfras_app.Activities.Instructor.InstructorHomePageActivity;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import pp.facerecognizer.FirstFRActicity;

public class MainActivity extends AppCompatActivity {
    private static final String CHANNEL_ID ="1" ;
    Button btnLogIn;
    Button btnSignup;
    TextView areYouInstructor;
    SharedPreferences mPrefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();

        setContentView(R.layout.activity_main);
        createNotificationChannel();
        mPrefs =getSharedPreferences(UserServices.CURRENT_USER, MODE_PRIVATE);

        if(mPrefs.contains(UserServices.CURRENT_USER)){
            Intent intent = new Intent(getApplicationContext(), HomePageActivity.class);
            startActivity(intent);

        }

        btnLogIn = findViewById(R.id.btnLogIn);
        btnSignup = findViewById(R.id.btnSignup);
        areYouInstructor=findViewById(R.id.areYouInstructor);
        areYouInstructor.setText(getString(R.string.areYouInstructor));
        areYouInstructor.setOnClickListener(v->{
            Intent i = new Intent(getApplicationContext(), InstructorCoursesList.class);
            startActivity(i);
        });
        btnLogIn.setOnClickListener(v-> {
            Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
            startActivity(intent);
        });
        btnSignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(), SignupActivity.class);
                startActivity(intent);

            }
        });
    }
    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "getString(R.string.channel_name)";
            String description = "getString(R.string.channel_description)";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

}