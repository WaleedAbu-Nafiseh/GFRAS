package com.example.gfras_app.Activities.CourseHomeUI.calendar;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CalendarView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Activities.CourseHomeUI.quiz.QuizListItemAdapter;
import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.Quiz;
import com.example.gfras_app.Data.Reminder;
import com.example.gfras_app.R;
import com.example.gfras_app.util.CollectionsName;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

public class CalendarFragment extends Fragment {
    List<Reminder> courseReminders;
    String courseID;
    CalendarView calendarView;
    Course course;


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_calendar, container, false);
        TextView textView = root.findViewById(R.id.text_gallery);
        calendarView = root.findViewById(R.id.calendarView);
        courseReminders = new ArrayList<>();
        calendarView.setOnDateChangeListener((calendarView, i, i1, i2) -> displayEventsForDate(i, i1, i2));
        CourseHomeMainActivity activity = (CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        String strtext = results.getString("COURSE");
        course = new Course();
        Gson g = new Gson();
        course = g.fromJson(results.getString("COURSE"), Course.class);
        textView.setText(strtext);
        getAllReminders();
        return root;
    }

    private void getAllReminders() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        CollectionReference courseRef = db.collection(CollectionsName.REMINDER);
        courseRef.whereEqualTo("courseID", course.getCourseId()).get().addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
            @Override
            public void onComplete(@NonNull Task<QuerySnapshot> task) {
                if (task.isSuccessful()) {
                    for (QueryDocumentSnapshot document : task.getResult()) {
                        Reminder c = document.toObject(Reminder.class);
                        courseReminders.add(c);
                    }
                    String text = "";
                    for (Reminder r :courseReminders){

                    }
                } else {
                    Log.d("TAG", "Error getting documents: ", task.getException());
                }
            }
        });

    }

    private void displayEventsForDate(int year, int month, int day) {
        Log.e("TEST", "year=" + year + "; month=" + month + "; day=" + day);
    }
}