package com.example.gfras_app.Data;

import android.util.Log;

import com.google.firebase.firestore.DocumentId;

import java.util.ArrayList;
import java.util.List;

public class GradeSheet {
    @DocumentId
    private String id;
    private String quizId;
    private String studentId;
    private int points;
    private List<Boolean> questionTF;
    private List<Boolean> questionAnswered;
    private List<Integer> questionPoints;


    public GradeSheet(String id, String quizId, int points, List<Boolean> questionTF, List<Integer> questionPoints, String studentId, List<Boolean> questionAnswered) {
        this.id = id;
        this.quizId = quizId;
        this.studentId = studentId;
        this.points = points;
        this.questionTF = questionTF;
        this.questionPoints = questionPoints;
        this.questionAnswered = questionAnswered;
    }

    public GradeSheet(int numQuestions) {
        this.points = 0;
        this.questionTF = new ArrayList<>();
        this.questionPoints = new ArrayList<>();
        this.questionAnswered = new ArrayList<>();

        for (int i = 0; i < numQuestions; i++) {
            this.questionTF.add(false);
            this.questionAnswered.add(false);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<Boolean> getQuestionTF() {
        return questionTF;
    }

    public void setQuestionTF(List<Boolean> questionTF) {
        this.questionTF = questionTF;
    }

    public List<Integer> getQuestionPoints() {
        return questionPoints;
    }

    public void setQuestionPoints(List<Integer> questionPoints) {
        this.questionPoints = questionPoints;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public List<Boolean> getQuestionAnswered() {
        return questionAnswered;
    }

    public void setQuestionAnswered(List<Boolean> questionAnswered) {
        this.questionAnswered = questionAnswered;
    }

    public void addCorrectQuestion(int index) {
        if (!this.questionAnswered.get(index)) {
            this.questionTF.set(index, true);
            this.setPoints(this.points + 2);
            this.questionAnswered.set(index, true);
            Log.e("QuizzingActivity", "You answered correctly the question number " + index + " and you have " + this.points + " points");
        }
        Log.e("QuizzingActivity", "You Already answered now");

    }

    public void addWrongQuestion(int index) {
        if (!this.questionAnswered.get(index)) {
            this.setPoints(this.points);
            this.questionAnswered.set(index, true);
        }
    }
}
