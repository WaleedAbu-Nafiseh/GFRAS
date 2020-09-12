package com.example.gfras_app.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import com.example.gfras_app.R;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class HomePageActivity extends AppCompatActivity {
    private DatabaseReference mDatabase;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home_page);
        mDatabase = FirebaseDatabase.getInstance().getReference();


    }
}