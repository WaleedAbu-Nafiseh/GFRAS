package com.example.gfras_app.Data.Course;

import android.util.Log;

import androidx.annotation.NonNull;

import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.LinkedList;
import java.util.List;
public class CourseListSingleton {
    String TAG=CourseListSingleton.class.getName();
    private static CourseListSingleton INSTANCE;
    List<Course> courseList;

    private CourseListSingleton() {
        courseList=new LinkedList<Course>();
        getOneCourseListFromDB();
    }
    private Course getOneCourseListFromDB() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        DocumentReference  docRef = db.collection(CollectionsName.COURSES).document("96JA4D9clsSaiMpjbTBa");
        final Course[] s = {new Course()};
        docRef.get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot document = task.getResult();
                    if (document.exists()) {
                        Log.d(TAG, "DocumentSnapshot data: " + document.getData());
                        Course c  =new Course();
                        c=document.toObject(Course.class);

                        Log.d(TAG,c.courseName+" j" );
                    } else {
                        Log.d(TAG, "No such document");
                    }
                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }
            }
        });

        return s[0];



    }

    public static CourseListSingleton getInstance(){
        if(INSTANCE==null){
            INSTANCE=new CourseListSingleton();
            return INSTANCE;
        }
        else
        return INSTANCE;
    }


}
