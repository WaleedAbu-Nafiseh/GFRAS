package com.example.gfras_app.Data.Course;

public class AttendanceItem {
    boolean isPresent;
    String studentID;
    String time;

    public AttendanceItem(boolean isPresent, String studentID, String time) {
        this.isPresent = isPresent;
        this.studentID = studentID;
        this.time = time;
    }

    public AttendanceItem() {
    }

    public boolean isIsPresent() {
        return isPresent;
    }

    public void setIsPresent(boolean present) {
        isPresent = present;
    }

    public String getStudentID() {
        return studentID;
    }

    public void setStudentID(String studentID) {
        this.studentID = studentID;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
