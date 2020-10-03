package com.example.gfras_app.Activities.CourseHomeUI.calendar;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.R;

public class CalendarFragment extends Fragment {


    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_calendar, container, false);
        final TextView textView = root.findViewById(R.id.text_gallery);
        textView.setText("Hello In Calendar");
        return root;
    }
}