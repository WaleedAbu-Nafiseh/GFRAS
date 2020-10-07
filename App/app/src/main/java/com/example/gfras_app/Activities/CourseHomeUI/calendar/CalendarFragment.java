package com.example.gfras_app.Activities.CourseHomeUI.calendar;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.R;

public class CalendarFragment extends Fragment {

    String courseID;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
       View root = inflater.inflate(R.layout.fragment_calendar, container, false);
       TextView textView =(TextView) root.findViewById(R.id.text_gallery);
        CourseHomeMainActivity activity=(CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        String strtext = results.getString("val1");
        textView.setText(strtext);
        return root;
       /* Bundle bundle = this.getArguments();
        if (bundle != null) {
             courseID = bundle.getString("COURSE_ID");
        }

        textView.setText("Hello In Calendar"+courseID);
        return root;*/
    }
}