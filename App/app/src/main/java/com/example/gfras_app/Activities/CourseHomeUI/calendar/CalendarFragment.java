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
import com.example.gfras_app.R;

public class CalendarFragment extends Fragment {

    String courseID;
    CalendarView calendarView;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_calendar, container, false);
        TextView textView = root.findViewById(R.id.text_gallery);
        calendarView = root.findViewById(R.id.calendarView);
        calendarView.setOnDateChangeListener((calendarView, i, i1, i2) -> displayEventsForDate(i, i1, i2));
        CourseHomeMainActivity activity = (CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        String strtext = results.getString("COURSE_ID");
        textView.setText(strtext);
        return root;
    }

    private void displayEventsForDate(int year, int month, int day) {
        Log.e("TEST", "year=" + year + "; month=" + month + "; day=" + day);
    }
}