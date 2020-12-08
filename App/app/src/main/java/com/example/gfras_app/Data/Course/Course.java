package com.example.gfras_app.Data.Course;

import com.google.firebase.firestore.DocumentId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Course {
    //10mzMn9tOoHXu85AI03p
    //mARIAM id

    @DocumentId
    String courseId;
    String courseName;
    String InstructorID;
    List<String> quizzes;
    List<String> students;

    public Course(String courseId, String courseName, String instructorID, List<String> quizzes, List<String> students) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.InstructorID = instructorID;
        this.quizzes = quizzes;
        this.students = students;

    }

    public Course() {
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



}
