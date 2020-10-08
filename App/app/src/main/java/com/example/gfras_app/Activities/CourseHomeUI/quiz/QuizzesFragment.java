package com.example.gfras_app.Activities.CourseHomeUI.quiz;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.R;


public class QuizzesFragment extends Fragment {


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_quizzes, container, false);
        final TextView textView = root.findViewById(R.id.text_home);
        CourseHomeMainActivity activity=(CourseHomeMainActivity) getActivity();
        Bundle results = activity.getMyData();
        String strtext = results.getString("COURSE_ID");

        textView.setText("This is Quiz fragment and course ID is: "+strtext);
        return root;
    }
}