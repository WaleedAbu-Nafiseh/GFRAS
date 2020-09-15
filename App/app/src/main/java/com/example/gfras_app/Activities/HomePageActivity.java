package com.example.gfras_app.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.example.gfras_app.R;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class HomePageActivity extends AppCompatActivity {
    private DatabaseReference mDatabase;
    Button btnToQuizPage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        mDatabase = FirebaseDatabase.getInstance().getReference();

        btnToQuizPage=findViewById(R.id.btnToQuizPage);
        btnToQuizPage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(),QuizzingActivity.class);
                startActivity(intent);
            }
        });

    }
}