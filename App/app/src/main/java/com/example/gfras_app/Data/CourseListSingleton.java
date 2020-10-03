package com.example.gfras_app.Data;

import android.util.Log;

import androidx.annotation.NonNull;

import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.Query;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
public class CourseListSingleton {
    String TAG=CourseListSingleton.class.getName();
    private static CourseListSingleton INSTANCE;
    List<Course> courseList;

    private CourseListSingleton() {
        courseList=new LinkedList<Course>();
        getCoursesListFromDB();
        getOneCourseListFromDB();
    }
    public  List<Course> getCoursesListFake(){
        List<String> quizzes = new LinkedList<String>();
        quizzes.add("Quix1");
        List<String> students=new LinkedList<String>();
        students.add("syudent1");
        courseList.add(new Course("comp",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("adwawdaw",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("erdhgerge",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));
        courseList.add(new Course("69czB4Krg19QX3LHfLrf",  "C",  "iO2qJRViPJ6rfoh1KzQW",  quizzes,  students));

   return courseList; }
    private void getCoursesListFromDB() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference citiesRef = db.collection(CollectionsName.COURSES);
        citiesRef.whereArrayContainsAny(CollectionsName.STUDENTS, Collections.singletonList("10mzMn9tOoHXu85AI03p")).get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            for (QueryDocumentSnapshot document : task.getResult()) {
                                Log.d(TAG, document.getId() + " => " + document.getData());
                               Course c = document.toObject(Course.class);
                               courseList.add(c);
                            }
                        } else {
                            Log.d(TAG, "Error getting documents: ", task.getException());
                        }
                    }
                });
        Log.d(TAG,  "this is the list: "+courseList.toString());



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
