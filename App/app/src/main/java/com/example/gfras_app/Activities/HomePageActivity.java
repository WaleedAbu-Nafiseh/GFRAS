package com.example.gfras_app.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Data.Course;
import com.example.gfras_app.Data.CourseListItemAdapter;
import com.example.gfras_app.Data.CourseListSingleton;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.LinkedList;
import java.util.List;

public class HomePageActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    ProgressBar prgsBarHomePage ;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private CourseListItemAdapter.RecyclerViewClickListener listener;
    List<Course> courseList;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_page);
        setOnclickListener();
        mRecyclerView = findViewById(R.id.CourseListRecyclerView);
        courseList=new LinkedList<Course>();
        prgsBarHomePage = findViewById(R.id.prgsBarHomePage);
        prgsBarHomePage.setVisibility(View.VISIBLE);
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(this);
        showEitherLoadingOrReady();

    }

    private void showEitherLoadingOrReady() {
            FirebaseFirestore db = FirebaseFirestore.getInstance();
            CollectionReference citiesRef = db.collection(CollectionsName.COURSES);
            citiesRef.whereArrayContains("students", " 10mzMn9tOoHXu85AI03p").get()
                    .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                        @Override
                        public void onComplete(@NonNull Task<QuerySnapshot> task) {
                            if (task.isSuccessful()) {
                                for (QueryDocumentSnapshot document : task.getResult()) {
                                    Log.d("TAG", document.getId() + " => " + document.getData());
                                    Course c = document.toObject(Course.class);
                                    courseList.add(c);
                                }

                                mAdapter = new CourseListItemAdapter(courseList,listener);
                                mRecyclerView.setLayoutManager(mLayoutManager);
                                prgsBarHomePage.setVisibility(View.INVISIBLE);
                                mRecyclerView.setAdapter(mAdapter);

                            } else {
                                Log.d("TAG", "Error getting documents: ", task.getException());
                            }
                        }
                    });
            Log.d("TAG",  "this is the list: "+courseList.toString());





    }

    private void setOnclickListener() {
        listener=new CourseListItemAdapter.RecyclerViewClickListener() {
            @Override
            public void onClick(View v, int position) {
                Intent intent=new Intent(getApplicationContext(), CourseHomeMainActivity.class);
                startActivity(intent);


            }
        };

    }

}