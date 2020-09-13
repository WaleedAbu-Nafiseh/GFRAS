package com.example.gfras_app.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.gfras_app.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

public class MainActivity extends AppCompatActivity {
    private static final String TAG = MainActivity.class.getName();
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    Button btnLogIn;
    Button btnSignup;
    EditText edtStudentID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        btnLogIn= findViewById(R.id.btnLogIn);
        btnSignup= findViewById(R.id.btnSignup);
         edtStudentID= findViewById(R.id.edtStudentID);
        onclick();
    }

    private void onclick() {
        btnLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String studentID= edtStudentID.getText().toString();
                db.collection("students")
                            .whereEqualTo("firstName", studentID)
                        .get()
                        .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                            @Override
                            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                if (task.isSuccessful()) {

                                    for (QueryDocumentSnapshot document : task.getResult()) {
                                        Log.d(TAG, document.getId() + " => " + document.getData());
                                        if(document.get("firstName").equals(edtStudentID.getText().toString())){
                                            Intent intent = new Intent(getApplicationContext(),HomePageActivity.class);
                                            startActivity(intent);
                                        }
                                        else{
                                            Log.d(TAG, document.getId() + " => " + document.getData());
                                            Toast toast = Toast.makeText(getApplicationContext(), "What?!", Toast.LENGTH_LONG);
                                            toast.show();
                                        }
                                    }
                                }
                                else {
                                    Log.d(TAG, "Error getting documents: ", task.getException());
                                    Toast toast = Toast.makeText(getApplicationContext(), "Try again, You failed!", Toast.LENGTH_LONG);
                                    toast.show();
                                }
                            }
                        });

            }
        });
        btnSignup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(getApplicationContext(),SignupActivity.class);
                startActivity(intent);

            }
        });
    }



}