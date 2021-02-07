package com.example.gfras_app.Activities;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.Course.CourseListItemAdapter;
import com.example.gfras_app.Data.User.User;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.firebase.firestore.WriteBatch;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.gson.Gson;

import java.util.LinkedList;
import java.util.List;

public class HomePageActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    ProgressBar prgsBarHomePage;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private CourseListItemAdapter.RecyclerViewClickListener listener;
    List<Course> courseList;
    User currentUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.home_page);
        setTitle("Your Courses");
        setOnclickListener();
        mRecyclerView = findViewById(R.id.CourseListRecyclerView);
        courseList = new LinkedList<Course>();
        prgsBarHomePage = findViewById(R.id.prgsBarHomePage);
        prgsBarHomePage.setVisibility(View.VISIBLE);
        mRecyclerView.setHasFixedSize(true);
        mLayoutManager = new LinearLayoutManager(this);
        currentUser = UserServices.getCurrentUser(getApplicationContext());
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (!task.isSuccessful()) {
                            Log.w("TEST", "Fetching FCM registration token failed", task.getException());
                            return;
                        }
                        // Get new FCM registration token
                        String token = task.getResult();
                        // Log and toast
                        if (currentUser.getToken() == null || currentUser.getToken() != token) {
                            currentUser.setToken(token);
                            FirebaseFirestore db = FirebaseFirestore.getInstance();
                            WriteBatch batch = db.batch();
                            DocumentReference sfRef = db.collection(CollectionsName.STUDENTS).document(currentUser.getId());
                            batch.update(sfRef, "token", currentUser.getToken()).commit();
                        }
                    }
                });
        showEitherLoadingOrReady();
    }

    private void showEitherLoadingOrReady() {

        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference courseRef = db.collection(CollectionsName.COURSES);
        courseRef.whereArrayContains(CollectionsName.STUDENTS, currentUser.getId()).get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                Log.d("TAG", document.toString() + " => " + document.getData());
                                Course c = document.toObject(Course.class);
                                courseList.add(c);
                                Log.e("ATT", document.getId() + " => " + c.getAttendance().keySet());
                            }

                            mAdapter = new CourseListItemAdapter(courseList, listener);
                            mRecyclerView.setLayoutManager(mLayoutManager);
                            prgsBarHomePage.setVisibility(View.INVISIBLE);
                            mRecyclerView.setAdapter(mAdapter);


                        } else {
                            Log.d("TAG", "Error getting documents: ", task.getException());
                        }
                    }
                });

    }

    private void setOnclickListener() {
        listener = (v, position) -> {
            Intent intent = new Intent(getApplicationContext(), CourseHomeMainActivity.class);
            Bundle bundle = new Bundle();
            Gson g = new Gson();
            bundle.putString("COURSE", g.toJson(courseList.get(position)));
            intent.putExtras(bundle);
            startActivity(intent);
        };

    }

}