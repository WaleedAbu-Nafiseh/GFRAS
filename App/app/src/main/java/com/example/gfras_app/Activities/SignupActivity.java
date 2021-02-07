package com.example.gfras_app.Activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.gfras_app.Data.Student;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.example.gfras_app.util.DBServices;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class SignupActivity extends AppCompatActivity {
    // FirebaseFirestore db = FirebaseFirestore.getInstance();
    TextView sdFName;
    TextView sdLName;
    TextView dateofbirth;
    TextView stdNum;
    TextView sdphone;
    TextView sdpass;
    Button btn_signup;

    private static FirebaseFirestore db;
    public static String TAG = DBServices.class.getName();


    TextView logtxt;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        sdFName = findViewById(R.id.sdFName);
        sdLName = (TextView) findViewById(R.id.sdLName);
        stdNum = (TextView) findViewById(R.id.stdNum);
        sdphone = (TextView) findViewById(R.id.sdphone);
        sdpass = (TextView) findViewById(R.id.sdpass);
        btn_signup = findViewById(R.id.btn_signup);
        logtxt = (TextView) findViewById(R.id.link_login);
        dateofbirth = findViewById(R.id.date);

        logtxt.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                openLoginPage();
            }

            private void openLoginPage() {
                Intent intent = new Intent(getApplicationContext(), LoginActivity.class);
                startActivity(intent);
            }
        });
        onclick();
    }

    private void onclick() {
        btn_signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String firstname = sdFName.getText().toString();
                String lastname = sdLName.getText().toString();
                String num = stdNum.getText().toString();
                int stdNum = Integer.parseInt(num);
                String phone = sdphone.getText().toString();
                String pass = sdpass.getText().toString();
                String birth = dateofbirth.getText().toString();
                List<String> courses = new LinkedList<>();
                courses.add("ZCecY0QNCiVEiU6ewdyH");
                Date d = new Date();
                d.getTime();
                Student student = new Student(firstname, lastname, d, pass, stdNum, phone, courses);
                DBServices.addToCollection(CollectionsName.STUDENTS, student);
            }
        });
    }
}