package com.example.gfras_app.Activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.example.gfras_app.Data.User.User;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

public class LoginActivity extends AppCompatActivity {
    private static final String TAG = LoginActivity.class.getName();
    FirebaseFirestore db = FirebaseFirestore.getInstance();
    Button btnLogIn;
    Button btnSignup;
    Button btnFR;
    EditText stdid;
    EditText edtStudentPassword;
    TextView txtWrong;
    SharedPreferences mPrefs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login);
        btnLogIn = findViewById(R.id.btnLogIn);

        stdid = findViewById(R.id.stdid);
        // txtWrong = findViewById(R.id.txtWrong);
        edtStudentPassword = findViewById(R.id.edtStudentPassword);
        onclick();
        mPrefs =getSharedPreferences(UserServices.CURRENT_USER, MODE_PRIVATE);

        if(mPrefs.contains(UserServices.CURRENT_USER)){
            Intent intent = new Intent(getApplicationContext(), HomePageActivity.class);
            startActivity(intent);

        }
        //set variables of 'myObject', etc.


    }

    private void onclick() {
        btnLogIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String studentID = stdid.getText().toString();
                db.collection(CollectionsName.STUDENTS)
                            .whereEqualTo("firstName", studentID)
                        .get()
                        .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                            @Override
                            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                if (task.isSuccessful()) {

                                    for (QueryDocumentSnapshot document : task.getResult()) {
                                        Log.d(TAG, document.getId() + " => " + document.getData());
                                        if (document.get("firstName").equals(stdid.getText().toString())
                                                && document.get("password").equals(edtStudentPassword.getText().toString())) {
                                            User s = document.toObject(User.class);
                                            UserServices.setCurrentUser(getApplicationContext(), s);
                                            Intent intent = new Intent(getApplicationContext(), HomePageActivity.class);
                                            startActivity(intent);
                                        } else {
                                            txtWrong.setText("Password or username are wrong");
                                            Log.d(TAG, document.getId() + " => " + document.getData());
                                            Toast toast = Toast.makeText(getApplicationContext(), "Password or username are wrong!", Toast.LENGTH_LONG);
                                            toast.show();
                                        }
                                    }
                                } else {
                                    txtWrong.setText("Error occured, make sure you are connected to the internet    ");

                                    Log.d(TAG, "Error getting documents: ", task.getException());
                                    Toast toast = Toast.makeText(getApplicationContext(), "Try again, You failed!", Toast.LENGTH_LONG);
                                    toast.show();
                                }
                            }
                        });

            }
        });

    }

}
