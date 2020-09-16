package com.example.gfras_app.Data;

public class Question {
    private String Question;
    private String correctAnswer;
    private String courseID;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private boolean showQuestion;

    public Question() {
    }

    public Question(String question, String correctAnswer, String courseID, String optionA, String optionB, String optionC, String optionD,boolean showQuestion) {
        Question = question;
        this.correctAnswer = correctAnswer;
        this.courseID = courseID;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.showQuestion=showQuestion;
    }

    public String getQuestion() {
        return Question;
    }

    public void setQuestion(String question) {
        Question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getCourseID() {
        return courseID;
    }

    public void setCourseID(String courseID) {
        this.courseID = courseID;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public boolean isShowQuestion() {
        return showQuestion;
    }

    public void setShowQuestion(boolean showQuestion) {
        this.showQuestion = showQuestion;
    }
}
