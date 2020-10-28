package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.gfras_app.Data.Question;
import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.Data.GradeSheet;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.firebase.database.annotations.Nullable;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.EventListener;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.FirebaseFirestoreException;

public class QuizzingActivity extends AppCompatActivity implements View.OnClickListener {

    private static FirebaseFirestore db;
    private  Bundle bundle;
    public Quiz quiz;
    public static String TAG=QuizzingActivity.class.getName();
    private TextView txtQuestionPlace;
    private TextView txtPoints;
    private ProgressBar prgsBar;
    DocumentReference docRef;
    private Button btnOptionA;
    private Button btnOptionB;
    private Button btnOptionC;
    private Button btnOptionD;
    private GradeSheet gradeSheet;
    int currentQuestionCounter;
    Question currentQuestion;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_quizzing);
        Bundle bundle = getIntent().getExtras();
        String quizID = bundle.getString("QUIZ_ID");
        Log.e(TAG,quizID);

        txtQuestionPlace=findViewById(R.id.txtQuestionPlace);
        txtPoints=findViewById(R.id.txtPoints);
        prgsBar=findViewById(R.id.prgsBar);
        btnOptionA=findViewById(R.id.btnOptionA);
        btnOptionB=findViewById(R.id.btnOptionB);
        btnOptionC=findViewById(R.id.btnOptionC);
        btnOptionD=findViewById(R.id.btnOptionD);
        btnOptionA.setOnClickListener(this);
        btnOptionB.setOnClickListener(this);
        btnOptionC.setOnClickListener(this);
        btnOptionD.setOnClickListener(this);
        Log.d(TAG," onCreate");
        prgsBar.setVisibility(View.VISIBLE);
        db = FirebaseFirestore.getInstance();
        docRef = db.collection(CollectionsName.QUIZZES).document(quizID);
        currentQuestionCounter=0;
        currentQuestion=new Question();
        start();

    }
    //Will be called by the onCreate method and it calls the write Ui whenever there is a change on the database
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
        if(gradeSheet==null){
            gradeSheet=new GradeSheet(quiz.getQuestions().size());
        }

        txtPoints.setText(Integer.toString(gradeSheet.getPoints()));
        Log.d(TAG,"writeUI points "+gradeSheet.getPoints());
        for(Question question:quiz.getQuestions() ){
            if (question.isShowQuestion()==true){
                currentQuestion=question;
                currentQuestionCounter=quiz.getQuestions().indexOf(currentQuestion);
            }

        }

        if(quiz.getIsStarted() && (currentQuestion!=null)){
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

        }else{
            //It is not started
            txtQuestionPlace.setText("Please wait until the quiz starts");
            btnOptionA.setVisibility(View.INVISIBLE);
            btnOptionB.setVisibility(View.INVISIBLE);
            btnOptionC.setVisibility(View.INVISIBLE);
            btnOptionD.setVisibility(View.INVISIBLE);
        }

    }

    @Override
    public void onClick(View view) {
        Button selectedButton = findViewById(view.getId());
        if(selectedButton.getText().toString().equals(currentQuestion.getCorrectAnswer())){
            gradeSheet.addCorrectQuestion(currentQuestionCounter);
            Log.d(TAG," Answered Correctly");
        }else{
            gradeSheet.addWrongQuestion(currentQuestionCounter);
        }
        Log.d(TAG,selectedButton.getText().toString());

        /*switch (view.getId()) {
            case R.id.btnOptionA:
                    if(btnOptionA.getText().toString().equals(currentQuestion.getCorrectAnswer())){
                        gradeSheet.addCorrectQuestion(currentQuestionCounter);
                        Log.d(TAG," Answered Correctly");
                    }else{
                        gradeSheet.addWrongQuestion(currentQuestionCounter);
                    }
                Log.d(TAG,btnOptionA.getText().toString());
                break;
            case R.id.btnOptionB:
                if(btnOptionB.getText().toString().equals(currentQuestion.getCorrectAnswer())){
                    gradeSheet.addCorrectQuestion(currentQuestionCounter);
                    Log.d(TAG," Answered Correctly");
                }else{
                    gradeSheet.addWrongQuestion(currentQuestionCounter);
                }
                Log.d(TAG,btnOptionA.getText().toString());
                break;
            case R.id.btnOptionC:
                if(btnOptionC.getText().toString().equals(currentQuestion.getCorrectAnswer())){
                    gradeSheet.addCorrectQuestion(currentQuestionCounter);
                    Log.d(TAG," Answered Correctly");
                }else{
                    gradeSheet.addWrongQuestion(currentQuestionCounter);
                }
                Log.d(TAG,btnOptionA.getText().toString());
                break;
            case R.id.btnOptionD:
                if(btnOptionD.getText().toString().equals(currentQuestion.getCorrectAnswer())){
                    gradeSheet.addCorrectQuestion(currentQuestionCounter);
                    Log.d(TAG," Answered Correctly");
                }else{
                    gradeSheet.addWrongQuestion(currentQuestionCounter);
                }
                Log.d(TAG,btnOptionA.getText().toString());
                break;
            default:
                break;
        }*/
    }
}