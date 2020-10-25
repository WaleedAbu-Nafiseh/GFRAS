package com.example.gfras_app.Data;

import com.google.firebase.firestore.DocumentId;

import java.util.List;

public class Quiz {
    @DocumentId
    String title;
    List<Question> questions;
    String courseID;
    boolean isStarted;

    public Quiz() {
    }

    public Quiz(String title, List<Question> questions, String courseID, boolean isStarted) {
        this.title = title;
        this.questions = questions;
        this.courseID = courseID;
        this.isStarted = isStarted;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public boolean getIsStarted() {
        return isStarted;
    }

    public void setIsStarted(boolean isStarted) {
        this.isStarted = isStarted;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
