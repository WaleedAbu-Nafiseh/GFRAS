package com.example.gfras_app.Data;

import com.google.firebase.firestore.DocumentId;

import java.util.List;

public class Quiz {
    @DocumentId
    String id;
    String quizTitle;
    List<Question> questions;
    String courseID;
    boolean isStarted;
    boolean finished;

    public Quiz() {
    }

    public Quiz(String title, List<Question> questions, String courseID, boolean isStarted, boolean finished) {
        this.quizTitle = title;
        this.questions = questions;
        this.courseID = courseID;
        this.isStarted = isStarted;
        this.finished = finished;
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

    public String getQuizTitle() {
        return quizTitle;
    }

    public void setQuizTitle(String quizTitle) {
        this.quizTitle = quizTitle;
    }

    public boolean isStarted() {
        return isStarted;
    }

    public void setStarted(boolean started) {
        isStarted = started;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}
