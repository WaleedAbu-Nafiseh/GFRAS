package com.example.gfras_app.Data.Course;

import com.google.firebase.firestore.DocumentId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Course {
    //10mzMn9tOoHXu85AI03p
    //mARIAM id

    @DocumentId
    String courseId;
    String courseName;
    String InstructorID;
    String startDate;
    List<String> quizzes;
    List<String> students;
    HashMap<String, ArrayList<AttendanceItem>> attendance;

    public Course(String courseId, String courseName, String instructorID, List<String> quizzes, List<String> students, HashMap<String, ArrayList<AttendanceItem>> attendance, String startDate) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.InstructorID = instructorID;
        this.quizzes = quizzes;
        this.students = students;
        this.attendance = attendance;
        this.startDate = startDate;
    }

    public Course() {
    }

    public HashMap<String, ArrayList<AttendanceItem>> getAttendance() {
        return attendance;
    }

    public void setAttendance(HashMap<String, ArrayList<AttendanceItem>> attendance) {
        this.attendance = attendance;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getInstructorID() {
        return InstructorID;
    }

    public void setInstructorID(String instructorID) {
        InstructorID = instructorID;
    }

    public List<String> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<String> quizzes) {
        this.quizzes = quizzes;
    }

    public List<String> getStudents() {
        return students;
    }

    public void setStudents(List<String> students) {
        this.students = students;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public int getTotalAttendanceDays() {
        return this.attendance.size();
    }

    public int getTotalAttendanceforStudent(String requestedStudentId) {
        int daysAvailableForStudent = 0;
        for (Map.Entry<String, ArrayList<AttendanceItem>> attendanceItems : attendance.entrySet()) {
            //Looping ovber the day
            for (AttendanceItem attendanceDayStudents : attendance.get(attendanceItems.getKey())) {
                //Looping to check if the student is in this day
                if (attendanceDayStudents.getStudentID().equals(requestedStudentId) && attendanceDayStudents.isIsPresent()) {
                    daysAvailableForStudent++;
                }
            }
        }
        return daysAvailableForStudent;
    }

}
