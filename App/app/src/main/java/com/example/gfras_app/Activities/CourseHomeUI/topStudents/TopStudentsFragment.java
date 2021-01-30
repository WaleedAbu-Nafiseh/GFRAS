package com.example.gfras_app.Activities.CourseHomeUI.topStudents;

import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import com.google.gson.Gson;

import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.PieModel;

public class TopStudentsFragment extends Fragment {
    PieChart pieChart;
    TextView absentDays, presentDays;
    int daysAbsent, daysAvailable, totalAttendanceDays;
    String legendLabelPresent, legendLabelAbsent;
    Course course;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_top_students, container, false);
        course = new Course();
        Gson g = new Gson();
        course = g.fromJson(((CourseHomeMainActivity) getActivity()).getMyData().getString("COURSE"), Course.class);
        pieChart = root.findViewById(R.id.piechart);
        absentDays = root.findViewById(R.id.absentDays);
        presentDays = root.findViewById(R.id.presentDays);
        totalAttendanceDays = course.getTotalAttendanceDays();
        daysAvailable = course.getTotalAttendanceforStudent(UserServices.getCurrentUser(getContext()).getId());
        daysAbsent = totalAttendanceDays - daysAvailable;
        legendLabelAbsent = "Absent: " + daysAbsent + " days";
        legendLabelPresent = "Present: " + daysAvailable + " days";
        absentDays.setText(legendLabelAbsent);
        presentDays.setText(legendLabelPresent);

        pieChart.addPieSlice(
                new PieModel(
                        legendLabelAbsent,
                        daysAbsent,
                        Color.parseColor("#EF5350")));
        pieChart.addPieSlice(
                new PieModel(
                        legendLabelPresent,
                        daysAvailable,
                        Color.parseColor("#66BB6A")));
        pieChart.startAnimation();

        return root;
    }
}