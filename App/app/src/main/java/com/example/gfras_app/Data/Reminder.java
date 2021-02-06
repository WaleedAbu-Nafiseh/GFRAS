package com.example.gfras_app.Data;

public class Reminder {
    String courseID;
    String date;
    String description;
    String time;
    String title;

    public Reminder(String courseID, String date, String description, String time, String title) {
        this.courseID = courseID;
        this.date = date;
        this.description = description;
        this.time = time;
        this.title = title;
    }

   public Reminder() {
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
