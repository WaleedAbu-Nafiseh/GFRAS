package com.example.gfras_app.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.gfras_app.Activities.Instructor.InstructorCoursesList;
import com.example.gfras_app.Activities.Instructor.InstructorHomePageActivity;
import com.example.gfras_app.R;
import pp.facerecognizer.FirstFRActicity;

public class MainActivity extends AppCompatActivity {
    Button btnLogIn;
    Button btnSignup;
    TextView areYouInstructor;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        getSupportActionBar().hide();

        setContentView(R.layout.activity_main);
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

}