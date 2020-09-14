package com.example.gfras_app.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.example.gfras_app.Data.Question;
import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.Data.Student;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.example.gfras_app.util.DBServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.annotations.Nullable;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;

import java.util.LinkedList;
import java.util.List;

public class QuizzingActivity extends AppCompatActivity {

    private static FirebaseFirestore db;
    public Quiz quiz;
    public static String TAG=QuizzingActivity.class.getName();
    private EditText edtText;
    private ProgressBar prgsBar;
    DocumentReference docRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_quizzing);
        edtText=findViewById(R.id.edtText);
        prgsBar=findViewById(R.id.prgsBar);
        prgsBar.setVisibility(View.VISIBLE);
        db = FirebaseFirestore.getInstance();
        docRef = db.collection(CollectionsName.QUIZZES).document("kPAZCjZjtFJjHNh5RnTt");

        /** This snippet is to sho wto to add a Quiz which contains a list of questions
         * List<Question> questions=new LinkedList<>();
           Question question1= new Question("What is my Name?",  "Waleed",  "1", "Waleed",
                   "Am", "Dav", "zami",false );
           Question question2= new Question("What is your Name?",  "Waleed",  "1", "Waleed",
                   "Am", "Dav", "zami",false );
           questions.add(question1);
           questions.add(question2);
           Quiz quiz = new Quiz( questions, "1", false);
           DBServices.addToCollection(CollectionsName.QUIZZES,quiz);*/

        start();
    }
    public void start(){

        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w(TAG, "Listen failed.", e);
                    return;
                }

                if (snapshot != null && snapshot.exists()) {
                    quiz =snapshot.toObject(Quiz.class);
                    writeUI();
                    Log.d(TAG, "Current data after Drama: " + snapshot.getData());
                } else {
                    Log.d(TAG, "Current data: null");
                }
            }
        });



    }


    public  void writeUI(){
        if(quiz.getIsStarted()){
            //It is  started
        }else{
            //It is not started
        }
        prgsBar.setVisibility(View.INVISIBLE);
        edtText.setText(quiz.getQuestions().get(0).getQuestion());

    }
}