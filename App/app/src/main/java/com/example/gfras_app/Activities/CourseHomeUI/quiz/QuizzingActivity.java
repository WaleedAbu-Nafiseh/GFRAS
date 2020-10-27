package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.firebase.database.annotations.Nullable;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;

public class QuizzingActivity extends AppCompatActivity {

    private static FirebaseFirestore db;
    private  Bundle bundle;
    public Quiz quiz;
    public static String TAG=QuizzingActivity.class.getName();
    private TextView txtQuestionPlace;
    private ProgressBar prgsBar;
    DocumentReference docRef;
    private Button btnOptionA;
    private Button btnOptionB;
    private Button btnOptionC;
    private Button btnOptionD;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_quizzing);
        Bundle bundle = getIntent().getExtras();
        String quizID = bundle.getString("QUIZ_ID");
        Log.e(TAG,quizID);

        txtQuestionPlace=findViewById(R.id.txtQuestionPlace);
        prgsBar=findViewById(R.id.prgsBar);
        btnOptionA=findViewById(R.id.btnOptionA);
        btnOptionB=findViewById(R.id.btnOptionB);
        btnOptionC=findViewById(R.id.btnOptionC);
        btnOptionD=findViewById(R.id.btnOptionD);
        Log.d(TAG," onCreate");
        prgsBar.setVisibility(View.VISIBLE);
        db = FirebaseFirestore.getInstance();
        docRef = db.collection(CollectionsName.QUIZZES).document(quizID);


        start();
    }
    public void start(){
        Log.d(TAG," start");

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
        Log.d(TAG," writeUI");

        if(quiz.getIsStarted()){
            //It is  started
            prgsBar.setVisibility(View.INVISIBLE);
            btnOptionA.setVisibility(View.VISIBLE);
            btnOptionB.setVisibility(View.VISIBLE);
            btnOptionC.setVisibility(View.VISIBLE);
            btnOptionD.setVisibility(View.VISIBLE);
            txtQuestionPlace.setText(quiz.getQuestions().get(0).getQuestion());
            btnOptionA.setText(quiz.getQuestions().get(0).getOptionA());
            btnOptionB.setText(quiz.getQuestions().get(0).getOptionB());
            btnOptionC.setText(quiz.getQuestions().get(0).getOptionC());
            btnOptionD.setText(quiz.getQuestions().get(0).getOptionD());

        }else{
            //It is not started
            txtQuestionPlace.setText("Please wait until the quiz starts");
            btnOptionA.setVisibility(View.INVISIBLE);
            btnOptionB.setVisibility(View.INVISIBLE);
            btnOptionC.setVisibility(View.INVISIBLE);
            btnOptionD.setVisibility(View.INVISIBLE);


        }

    }



}