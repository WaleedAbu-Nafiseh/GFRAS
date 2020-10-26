package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.Course.CourseListItemAdapter;
import com.example.gfras_app.Data.Question;
import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.Activities.CourseHomeUI.quiz.QuizListItemAdapter;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.gson.Gson;

import java.util.LinkedList;
import java.util.List;


public class QuizzesFragment extends Fragment {
    private String quizTitle;
    private  Bundle bundle;
    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private QuizListItemAdapter.RecyclerViewClickListener listener;
    List<Quiz> quizList;
    Course currentCourse;
    Course selectedCourse;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        setOnclickListener();

        View root = inflater.inflate(R.layout.fragment_quizzes, container, false);

        return root;
    }

    @Override
    public void onStart() {
        super.onStart();

        mRecyclerView = getActivity().findViewById(R.id.quizListRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(getContext());
        Gson g = new Gson();
        CourseHomeMainActivity activity=(CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        currentCourse=g.fromJson(results.getString("COURSE_ID"),Course.class);
        selectedCourse= new Course();
        quizList=new LinkedList<Quiz>();
        showData();
    }

    public void showData(){
        List<Question> questions=new LinkedList<>();
     /*   Question question1= new Question("What is my Name?",  "Waleed",  "1", "Waleed",
                "Am", "Dav", "zami",false );
        Question question2= new Question("What is your Name?",  "Waleed",  "1", "Waleed",
                "Am", "Dav", "zami",false );
        questions.add(question1);
        questions.add(question2);
        Quiz quiz1 = new Quiz("POP QUIZ", questions, "1", false);
        Quiz quiz2 = new Quiz("GAME", questions, "2", true);
        Quiz quiz3 = new Quiz("EVALUATION", questions, "3", true);
        Quiz quiz4 = new Quiz("TEST", questions, "4", false);

        quizList.add(quiz1);
        quizList.add(quiz2);
        quizList.add(quiz3);
        quizList.add(quiz4);*/

       // Log.e("TEST",quizList.get(0).getCourseID());


        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference courseRef = db.collection(CollectionsName.QUIZZES);
        courseRef.whereEqualTo("courseID",currentCourse.getCourseId()).get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Log.d("TAGQUIZ", document.getId() + " => " + document.getData());
                        Quiz c = document.toObject(Quiz.class);
                        quizList.add(c);
                    }

                    mAdapter = new QuizListItemAdapter(quizList, listener);
                    mRecyclerView.setLayoutManager(mLayoutManager);
                    mRecyclerView.setAdapter(mAdapter);

                } else {
                    Log.d("TAG", "Error getting documents: ", task.getException());
                }
            }





        });





    }

   private void setOnclickListener() {
        listener = new QuizListItemAdapter.RecyclerViewClickListener() {

            public void onClick(View v, int position) {


            }
        };

    }

}