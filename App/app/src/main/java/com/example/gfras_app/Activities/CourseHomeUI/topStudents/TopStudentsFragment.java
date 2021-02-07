package com.example.gfras_app.Activities.CourseHomeUI.topStudents;

import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;

import com.example.gfras_app.Activities.CourseHomeUI.CourseHomeMainActivity;
import com.example.gfras_app.Data.Course.AttendanceItem;
import com.example.gfras_app.Data.Course.Course;
import com.example.gfras_app.Data.User.UserServices;
import com.example.gfras_app.R;
import com.google.gson.Gson;

import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.PieModel;

import java.util.ArrayList;
import java.util.List;

public class TopStudentsFragment extends Fragment {
    PieChart pieChart;
    CardView missedDays;
    TextView absentDays, presentDays, txtPoints;
    int daysAbsent, daysAvailable, totalAttendanceDays;
    String legendLabelPresent, legendLabelAbsent;
    Course course;
    int missedPoints;
    List<AttendanceItem> listAttendance;
    List<AttendanceItem> absentAttendance;
    List<String> absentAttendanceText;
    ListView missedDaysText;
    int points;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        View root = inflater.inflate(R.layout.fragment_top_students, container, false);
        points = 0;
        course = new Course();
        Gson g = new Gson();
        listAttendance = new ArrayList<>();
        absentAttendance = new ArrayList<>();
        absentAttendanceText = new ArrayList<>();
        course = g.fromJson(((CourseHomeMainActivity) getActivity()).getMyData().getString("COURSE"), Course.class);
        filterCourses();
        missedDaysText = (ListView) root.findViewById(R.id.missedDaysText);
        txtPoints = root.findViewById(R.id.txtPoints);
        missedDays = root.findViewById(R.id.missedDays);
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

        if (absentAttendance.isEmpty()) {
            missedDays.setVisibility(View.INVISIBLE);
        } else {
            missedDays.setVisibility(View.VISIBLE);
            missedDaysText.setVisibility(View.VISIBLE);
            ArrayAdapter adapter = new ArrayAdapter<String>(getContext(), R.layout.activity_listview, absentAttendanceText);
            missedDaysText.setAdapter(adapter);
        }
        for (AttendanceItem a : listAttendance) {
            Log.e("TEST", "" + a.getStudentID());
        }
        txtPoints.setText("You have "+points+" points");
        return root;
    }

    public void filterCourses() {

        for (String key : course.getAttendance().keySet()) {
            List<AttendanceItem> attendanceItems = course.getAttendance().get(key);

            for (AttendanceItem attendance : attendanceItems) {
                if (attendance.getStudentID().equals(UserServices.getCurrentUser(getContext()).getId()) && attendance.isIsPresent()) {
                    listAttendance.add(attendance);
                    points = points + attendance.getAttendancePoint();
                } else if (attendance.getStudentID().equals(UserServices.getCurrentUser(getContext()).getId()) && attendance.isIsPresent() == false) {
                    absentAttendance.add(attendance);
                    absentAttendanceText.add(key);
                }

            }
        }

    }

    public void getPoints() {

    }

}