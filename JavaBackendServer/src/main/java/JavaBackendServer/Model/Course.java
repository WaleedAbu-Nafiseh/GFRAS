/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package JavaBackendServer.Model;

/**
 *
 * @author wa1
 */
import com.google.cloud.firestore.annotation.DocumentId;
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
    List<String> quizzes;
    List<String> students;
    HashMap<String, List<Attendance>> attendance;

    public Course(String courseName, String InstructorID, List<String> quizzes, List<String> students, HashMap<String, List<Attendance>>  attendance) {
        this.courseName = courseName;
        this.InstructorID = InstructorID;
        this.quizzes = quizzes;
        this.students = students;
        this.attendance = attendance;
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

    public HashMap<String, List<Attendance>>  getAttendance() {
        return attendance;
    }

    public void setAttendance(HashMap<String, List<Attendance>>  attendance) {
        this.attendance = attendance;
    }

}
