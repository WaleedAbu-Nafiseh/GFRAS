package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.Question;
import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.Data.GradeSheet;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.example.gfras_app.util.DBServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.annotations.Nullable;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.gson.Gson;

public class QuizzingActivity extends AppCompatActivity implements View.OnClickListener {

    private static FirebaseFirestore db;
    public Quiz quiz;
    public static String TAG = QuizzingActivity.class.getName();
    private TextView txtQuestionPlace;
    private TextView txtPoints;
    private ProgressBar prgsBar;
    DocumentReference docRef;
    private Button btnOptionA;
    private Button btnOptionB;
    private Button btnOptionC;
    private Button btnOptionD;
    private GradeSheet gradeSheet;
    private ConstraintLayout quizLayout;
    int currentQuestionCounter;
    Question currentQuestion;
    Course currentCourse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_quizzing);
        Bundle bundle = getIntent().getExtras();
        String quizID = bundle.getString("QUIZ_ID");
        Gson g = new Gson();
        currentCourse = new Course();
        currentCourse = g.fromJson(bundle.getString("COURSE"), Course.class);
        txtQuestionPlace = findViewById(R.id.txtQuestionPlace);
        txtPoints = findViewById(R.id.txtPoints);
        prgsBar = findViewById(R.id.prgsBar);

        btnOptionA = findViewById(R.id.btnOptionA);
        btnOptionB = findViewById(R.id.btnOptionB);
        btnOptionC = findViewById(R.id.btnOptionC);
        btnOptionD = findViewById(R.id.btnOptionD);
        quizLayout = findViewById(R.id.quizLayout);

        btnOptionA.setOnClickListener(this);
        btnOptionB.setOnClickListener(this);
        btnOptionC.setOnClickListener(this);
        btnOptionD.setOnClickListener(this);

        prgsBar.setVisibility(View.VISIBLE);
        db = FirebaseFirestore.getInstance();
        docRef = db.collection(CollectionsName.QUIZZES).document(quizID);
        currentQuestionCounter = 0;
        currentQuestion = new Question();
        start();

    }

    //Will be called by the onCreate method and it calls the write Ui whenever there is a change on the database
    public void start() {

        docRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
            @Override
            public void onEvent(@Nullable DocumentSnapshot snapshot,
                                @Nullable FirebaseFirestoreException e) {
                if (e != null) {
                    Log.w(TAG, "Listen failed.", e);
                    return;
                }

                if (snapshot != null && snapshot.exists()) {
                    quiz = snapshot.toObject(Quiz.class);
                    Log.d(TAG, "Current data after Drama: " + snapshot.getData());
                    DocumentReference courseDocRef = db.collection(CollectionsName.COURSES).document(quiz.getCourseID());
                    courseDocRef.addSnapshotListener(new EventListener<DocumentSnapshot>() {
                        @Override
                        public void onEvent(@Nullable DocumentSnapshot snapshot,
                                            @Nullable FirebaseFirestoreException e) {
                            if (e != null) {
                                Log.w(TAG, "Listen failed.", e);
                                return;
                            }

                            if (snapshot != null && snapshot.exists()) {
                                currentCourse = snapshot.toObject(Course.class);
                                writeUI();
                                Log.d(TAG, "Current data after Drama: " + snapshot.getData());
                            } else {
                                Log.d(TAG, "Current data: null");
                            }
                        }
                    });
                } else {
                    Log.d(TAG, "Current data: null");
                }
            }
        });

    }

    public void writeUI() {

        if (quiz.isFinished()) {
            txtQuestionPlace.setText("The quiz is done");
            btnOptionA.setVisibility(View.INVISIBLE);
            btnOptionB.setVisibility(View.INVISIBLE);
            btnOptionC.setVisibility(View.INVISIBLE);
            btnOptionD.setVisibility(View.INVISIBLE);
            if (gradeSheet == null) {
                gradeSheet = getGradeSheet();
            } else {
                DBServices.addToCollection("GradeSheet", gradeSheet);

            }
        } else {
            if (gradeSheet == null) {
                gradeSheet = new GradeSheet(currentCourse.getCourseId(), quiz.getQuestions().size(), quiz.getId(), UserServices.getCurrentUser(getApplicationContext()).getId());
            }
        }
        if (gradeSheet!= null) {
            txtPoints.setText(Integer.toString(gradeSheet.getPoints()));
        }

        for (Question question : quiz.getQuestions()) {

            if (question.isShowQuestion() == true) {
                currentQuestion = question;
                currentQuestionCounter = quiz.getQuestions().indexOf(currentQuestion);
            }

        }

        if (quiz.getIsStarted() && (currentQuestion != null) && (currentCourse != null) && !quiz.isFinished()) {
            //It is  started
            prgsBar.setVisibility(View.INVISIBLE);
            btnOptionA.setVisibility(View.VISIBLE);
            btnOptionB.setVisibility(View.VISIBLE);
            btnOptionC.setVisibility(View.VISIBLE);
            btnOptionD.setVisibility(View.VISIBLE);
            txtQuestionPlace.setText(currentQuestion.getQuestion());
            btnOptionA.setText(currentQuestion.getOptionA());
            btnOptionB.setText(currentQuestion.getOptionB());
            btnOptionC.setText(currentQuestion.getOptionC());
            btnOptionD.setText(currentQuestion.getOptionD());

            btnOptionA.setEnabled(true);
            btnOptionB.setEnabled(true);
            btnOptionC.setEnabled(true);
            btnOptionD.setEnabled(true);

            btnOptionA.setBackground(getDrawable(R.drawable.quizzingbtn1background));
            btnOptionB.setBackground(getDrawable(R.drawable.quizzingbtn2background));
            btnOptionC.setBackground(getDrawable(R.drawable.quizzingbtn3background));
            btnOptionD.setBackground(getDrawable(R.drawable.quizzingbtn4background));

        } else if (quiz.isFinished()) {
            prgsBar.setVisibility(View.INVISIBLE);
        } else {
            //It is not started
            txtQuestionPlace.setText("Please wait until the quiz starts");
            txtPoints.setVisibility(View.INVISIBLE);
            btnOptionA.setVisibility(View.INVISIBLE);
            btnOptionB.setVisibility(View.INVISIBLE);
            btnOptionC.setVisibility(View.INVISIBLE);
            btnOptionD.setVisibility(View.INVISIBLE);
        }

    }

    public GradeSheet getGradeSheet() {
        final GradeSheet[] gradeSheet = new GradeSheet[1];
        db.collection(CollectionsName.GRADESHEET)
                .whereEqualTo("courseID", currentCourse.getCourseId())
                .whereEqualTo("quizId", quiz.getId()).
                whereEqualTo("studentId", UserServices.getCurrentUser(getApplicationContext()).getId()).get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                gradeSheet[0] = document.toObject(GradeSheet.class);
                                txtQuestionPlace.setText("Your grade in  " + gradeSheet[0].getPoints() + "\n" + ((gradeSheet[0].getPoints() > 3) ? "You are above avergae " : "You are below average"));
                                txtPoints.setVisibility(View.INVISIBLE);
                                Log.d(TAG, document.getId() + " => " + document.getData());
                            }
                        } else {
                            gradeSheet[0] = null;
                            Log.d(TAG, "Error getting documents: ", task.getException());
                        }
                    }
                });
        return gradeSheet[0];
    }

    @Override
    public void onClick(View view) {
        Button selectedButton = findViewById(view.getId());
        switch (view.getId()) {
            case R.id.btnOptionA:
                btnOptionA.setEnabled(true);
                btnOptionB.setEnabled(false);
                btnOptionC.setEnabled(false);
                btnOptionD.setEnabled(false);
                break;

            case R.id.btnOptionB:
                btnOptionA.setEnabled(false);
                btnOptionB.setEnabled(true);
                btnOptionC.setEnabled(false);
                btnOptionD.setEnabled(false);
                break;

            case R.id.btnOptionC:
                btnOptionA.setEnabled(false);
                btnOptionB.setEnabled(false);
                btnOptionC.setEnabled(true);
                btnOptionD.setEnabled(false);
                break;
            case R.id.btnOptionD:
                btnOptionA.setEnabled(false);
                btnOptionB.setEnabled(false);
                btnOptionC.setEnabled(false);
                btnOptionD.setEnabled(true);
                break;

        }
        if (selectedButton.getText().toString().equals(currentQuestion.getCorrectAnswer())) {
            gradeSheet.addCorrectQuestion(currentQuestionCounter);
            selectedButton.setBackgroundColor(Color.parseColor("#0EBB3D"));
            Log.d(TAG, " Answered Correctly");

        } else {
            gradeSheet.addWrongQuestion(currentQuestionCounter);
            selectedButton.setBackgroundColor(Color.parseColor("#F3290D"));
        }
        Log.d(TAG, selectedButton.getText().toString());

    }

}