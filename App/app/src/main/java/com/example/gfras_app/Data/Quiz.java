package com.example.gfras_app.Data;

import com.google.firebase.firestore.DocumentId;

import java.util.List;

public class Quiz {
    @DocumentId
    String id;
    List<Question> questions;
    String courseID;
    boolean isStarted;

    public Quiz() {
    }

    public Quiz( List<Question> questions, String courseID, boolean isStarted) {

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
