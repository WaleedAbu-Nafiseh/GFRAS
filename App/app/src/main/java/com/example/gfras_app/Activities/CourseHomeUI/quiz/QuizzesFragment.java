package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import android.content.Intent;
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
import com.example.gfras_app.Data.Quiz;
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
    private Bundle bundle;
    private RecyclerView mRecyclerView;
    private RecyclerView finishedquizListRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.Adapter mAdapterFinished;
    private RecyclerView.LayoutManager mLayoutManager;
    private RecyclerView.LayoutManager mLayoutManagerFinished;
    private QuizListItemAdapter.RecyclerViewClickListener listener;
    List<Quiz> quizList;
    List<Quiz> finishedQuizList;
    Course currentCourse;
    Course selectedCourse;
    QuizListItemAdapter.RecyclerViewClickListener finishedListener;

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
        finishedquizListRecyclerView = getActivity().findViewById(R.id.finishedquizListRecyclerView);
        mRecyclerView.setHasFixedSize(true);
        finishedquizListRecyclerView.setHasFixedSize(true);
        mLayoutManagerFinished = new LinearLayoutManager(getContext());
        Gson g = new Gson();
        CourseHomeMainActivity activity = (CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        currentCourse = g.fromJson(results.getString("COURSE"), Course.class);
        selectedCourse = new Course();
        quizList = new LinkedList<Quiz>();
        finishedQuizList = new LinkedList<Quiz>();
        showData();
    }

    public void showData() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference courseRef = db.collection(CollectionsName.QUIZZES);
        courseRef.whereEqualTo("courseID", currentCourse.getCourseId()).get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Quiz c = document.toObject(Quiz.class);
                        if (!c.isFinished()) {
                            quizList.add(c);
                        } else {
                            finishedQuizList.add(c);
                        }
                    }
                    if(quizList.isEmpty()){
                        mRecyclerView.setVisibility(View.INVISIBLE);
                    }

                    mAdapter = new QuizListItemAdapter(quizList, listener);
                    mRecyclerView.setLayoutManager(mLayoutManager);
                    mRecyclerView.setAdapter(mAdapter);

                    mAdapterFinished = new QuizListItemAdapter(finishedQuizList, finishedListener);
                    finishedquizListRecyclerView.setLayoutManager(mLayoutManagerFinished);
                    finishedquizListRecyclerView.setAdapter(mAdapterFinished);

                } else {
                    Log.d("TAG", "Error getting documents: ", task.getException());
                }
            }
        });
    }

    private void setOnclickListener() {
        listener = new QuizListItemAdapter.RecyclerViewClickListener() {
            public void onClick(View v, int position) {
                Intent i = new Intent(getContext(), QuizzingActivity.class);
                //Create the bundle
                Bundle bundle = new Bundle();
                //Add your data from getFactualResults method to bundle
                bundle.putString("QUIZ_ID", quizList.get(position).getId());
                Gson g = new Gson();
                bundle.putString("COURSE", g.toJson(currentCourse));
                //Add the bundle to the intent
                i.putExtras(bundle);
                startActivity(i);

            }
        };
        finishedListener = new QuizListItemAdapter.RecyclerViewClickListener() {
            public void onClick(View v, int position) {
                Intent i = new Intent(getContext(), QuizzingActivity.class);
                //Create the bundle
                Bundle bundle = new Bundle();
                //Add your data from getFactualResults method to bundle
                bundle.putString("QUIZ_ID", finishedQuizList.get(position).getId());
                Gson g = new Gson();
                bundle.putString("COURSE", g.toJson(currentCourse));
                //Add the bundle to the intent
                i.putExtras(bundle);
                startActivity(i);

            }
        };

    }

}